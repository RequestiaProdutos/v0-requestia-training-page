import type { EmailPayload } from "../types";
import { loadPublicTemplate, renderTemplate } from "../template-engine";
import { renderEssentialsInternalEmail } from "./internal-essentials";

function pcdLabel(value?: boolean | null): string {
  if (value === true) return "Sim";
  if (value === false) return "Não";
  return "—";
}

function pickFeInternalTemplateFile(guestCount: number): string {
  if (guestCount <= 0) return "fe-inscricaorecebido-internal.html";
  if (guestCount === 1)
    return "fe-inscricao_1_participanterecebido-internal.html";
  return "fe-inscricao_2_participanterecebido-internal.html";
}

function levelLabel(level: EmailPayload["level"]): string {
  return level === "expert" ? "Requestia Expert" : "Requestia Foundations";
}

async function renderFeInternalEmail(data: EmailPayload): Promise<string> {
  const guests = (data.additionalParticipants ?? []).slice(0, 2);
  const [g1, g2] = guests;

  const template = await loadPublicTemplate(
    pickFeInternalTemplateFile(guests.length),
  );

  const vars: Record<string, string> = {
    level: levelLabel(data.level),
    date: data.training.date ?? "A confirmar",

    fullName: data.participant.fullName,
    role: data.participant.role,
    company: data.participant.company,
    email: data.participant.email,
    phone: data.participant.phone,
    compFinName: data.participant.compFinName ?? "—",
    compFinEmail: data.participant.compFinEmail ?? "—",
    isPCD: pcdLabel(data.participant.isPCD),
    pcdDescription: data.participant.pcdDescription?.trim() || "—",

    addName1: g1?.addName ?? "—",
    addRole1: g1?.role ?? "—",
    addEmail1: g1?.email ?? "—",
    addPhone: g1?.phone ?? "—", // template de 1 convidado usa addPhone
    addPhone1: g1?.phone ?? "—", // template de 2 convidados usa addPhone1
    isPCD1: pcdLabel(g1?.isPCD),
    pcdDescription1: g1?.pcdDescription?.trim() || "—",

    addName2: g2?.addName ?? "—",
    addRole2: g2?.role ?? "—",
    addEmail2: g2?.email ?? "—",
    addPhone2: g2?.phone ?? "—",
    isPCD2: pcdLabel(g2?.isPCD),
    pcdDescription2: g2?.pcdDescription?.trim() || "—",
  };

  return renderTemplate(template, vars);
}

export async function renderInternalEmail(data: EmailPayload): Promise<string> {
  if (data.level === "essentials") {
    return renderEssentialsInternalEmail(data);
  }

  return renderFeInternalEmail(data);
}
