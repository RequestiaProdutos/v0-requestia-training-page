import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import { renderParticipantEmail } from "@/lib/email/templates";
import { renderInternalEmail } from "@/lib/email/templates/internal";

const optionalEmail = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().email().optional());

const participantSchema = z.object({
  fullName: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  email: z.string().trim().email(),
  phone: z.string().min(1),
  compFinName: z.string().optional(),
  compFinEmail: optionalEmail,
  isPCD: z.boolean().nullable().optional(),
  pcdDescription: z.string().optional(),
});

const payloadSchema = z.object({
  level: z.enum(["essentials", "foundations", "expert"]),
  training: z.object({
    date: z.string().optional(),
    location: z.string().optional(),
    duration: z.string().optional(),
    certification: z.string().optional(),
  }),
  participant: participantSchema,
  additionalParticipants: z
    .array(
      z.object({
        addName: z.string(),
        role: z.string(),
        email: z.string().email(),
        phone: z.string(),
        isPCD: z.boolean().nullable().optional(),
        pcdDescription: z.string().optional(),
      }),
    )
    .optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Payload inválido",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const participantHtml = await renderParticipantEmail(data);
    const internalHtml = await renderInternalEmail(data);

    const internalRecipients = (process.env.MAIL_TO_INTERNAL ?? "")
      .split(/[;,]/)
      .map((email) => email.trim())
      .filter(Boolean);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: Number(process.env.SMTP_PORT) === 465,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: internalRecipients,
      subject: `[Treinamento] Nova inscrição - ${data.level}`,
      html: internalHtml,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.participant.email,
      subject: "Confirmação de inscrição - Requestia",
      html: participantHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    console.error("[v0] SMTP_HOST:", process.env.SMTP_HOST);
    console.error("[v0] SMTP_PORT:", process.env.SMTP_PORT);
    console.error("[v0] SMTP_USER:", process.env.SMTP_USER ? "****" : "NÃO CONFIGURADO");
    console.error("[v0] SMTP_PASS:", process.env.SMTP_PASS ? "****" : "NÃO CONFIGURADO");
    console.error("[v0] SMTP_FROM:", process.env.SMTP_FROM);
    console.error("[v0] MAIL_TO_INTERNAL:", process.env.MAIL_TO_INTERNAL);
    return NextResponse.json(
      { ok: false, error: "Falha no envio", details: String(error) },
      { status: 500 },
    );
  }
}
