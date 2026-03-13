import type { EmailPayload } from "../types";
import { loadPublicTemplate, renderTemplate } from "../template-engine";

function firstName(fullName: string): string {
  const trimmed = fullName.trim();
  return trimmed ? trimmed.split(/\s+/)[0] : "";
}

function pcdLabel(value?: boolean | null): string {
  if (value === true) return "Sim";
  if (value === false) return "Não";
  return "—";
}

function pickTemplateFile(guestCount: number): string {
  if (guestCount <= 0) return "fe-inscricaorecebido.html";
  if (guestCount === 1) return "fe-inscricao_1_participanterecebido.html";
  return "fe-inscricao_2_participanterecebido.html";
}

export async function renderFeParticipantEmail(
  data: EmailPayload,
): Promise<string> {
  const guests = (data.additionalParticipants ?? []).slice(0, 2);
  const [g1, g2] = guests;

  const template = await loadPublicTemplate(pickTemplateFile(guests.length));

  const levelLabel =
    data.level === "expert" ? "Requestia Expert" : "Requestia Foundations";

  const vars: Record<string, string> = {
    nickname: firstName(data.participant.fullName),
    level: levelLabel,
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

    "var:URLSITE": process.env.MAIL_SITE_URL || "https://requestia.com",
    "url:application": process.env.MAIL_APP_URL || "https://requestia.com",
    TOKEN_UUID_EMAIL: "",
    "GETQFORM(MKT_CAMP_SOURCE)": "treinamento",
    "GETQFORM(MKT_CAMP_CAMPAIGN)": "inscricao-realizada",
    "var:wa-app": "requestia",
  };

  return renderTemplate(template, vars);
}
