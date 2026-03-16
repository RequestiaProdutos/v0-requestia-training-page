import type { EmailPayload } from "../types";
import { loadPublicTemplate, renderTemplate } from "../template-engine";

export async function renderEssentialsInternalEmail(
  data: EmailPayload,
): Promise<string> {
  const template = await loadPublicTemplate(
    "essentials-inscricaorecebida-internal.html",
  );

  const vars: Record<string, string> = {
    fullName: data.participant.fullName,
    role: data.participant.role,
    company: data.participant.company,
    email: data.participant.email,
    phone: data.participant.phone,
  };

  return renderTemplate(template, vars);
}
