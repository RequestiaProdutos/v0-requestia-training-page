// lib/email/templates/essentials.ts
import type { EmailPayload } from "../types";
import { loadPublicTemplate, renderTemplate } from "../template-engine";

function firstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] || trimmed;
}

export async function renderEssentialsParticipantEmail(
  data: EmailPayload,
): Promise<string> {
  const template = await loadPublicTemplate("treinamento-essentials.html");

  const vars: Record<string, string> = {
    nickname: firstName(data.participant.fullName),
    level: "Requestia Essentials",
    fullName: data.participant.fullName,
    role: data.participant.role,
    company: data.participant.company,
    email: data.participant.email,
    phone: data.participant.phone,

    // tokens legados do template
    "var:URLSITE": process.env.MAIL_SITE_URL || "https://requestia.com",
    "url:application": process.env.MAIL_APP_URL || "https://requestia.com",
    TOKEN_UUID_EMAIL: "",
    "GETQFORM(MKT_CAMP_SOURCE)": "treinamento",
    "GETQFORM(MKT_CAMP_CAMPAIGN)": "inscricao-essentials",
    "var:wa-app": "requestia",
  };

  return renderTemplate(template, vars);
}
