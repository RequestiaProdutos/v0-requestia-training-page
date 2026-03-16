// lib/email/templates/index.ts
import type { EmailPayload } from "../types";
import { renderEssentialsParticipantEmail } from "./essentials";
import { renderFeParticipantEmail } from "./fe-participant";

export async function renderParticipantEmail(
  data: EmailPayload,
): Promise<string> {
  if (data.level === "essentials") {
    return renderEssentialsParticipantEmail(data);
  }

  return renderFeParticipantEmail(data);
}
