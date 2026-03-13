// lib/email/templates/index.ts
import type { EmailPayload } from "../types";
import { renderEssentialsParticipantEmail } from "./essentials";
import { renderFeParticipantEmail } from "./fe-participant";

function renderDefaultParticipantEmail(data: EmailPayload): string {
  return [
    "<h2>Inscrição recebida com sucesso</h2>",
    "<p>Olá, " + data.participant.fullName + ".</p>",
    "<p>Recebemos sua inscrição no treinamento <strong>" +
      data.level +
      "</strong>.</p>",
    "<p>Data: " + (data.training.date || "A confirmar") + "</p>",
    "<p>Local: " + (data.training.location || "A confirmar") + "</p>",
    "<p>Duração: " + (data.training.duration || "-") + "</p>",
    "<p>Em breve nossa equipe fará a validação e retornará com os próximos passos.</p>",
  ].join("");
}

export async function renderParticipantEmail(
  data: EmailPayload,
): Promise<string> {
  if (data.level === "essentials") {
    return renderEssentialsParticipantEmail(data);
  }

  return renderFeParticipantEmail(data);
}
