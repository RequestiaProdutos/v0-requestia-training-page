import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { renderContactInternalEmail } from "@/lib/email/templates/contact";

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

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
    const html = await renderContactInternalEmail(data);

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
      subject: "[Treinamento] Nova dúvida recebida",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar dúvida:", error);
    return NextResponse.json(
      { ok: false, error: "Falha no envio" },
      { status: 500 },
    );
  }
}
