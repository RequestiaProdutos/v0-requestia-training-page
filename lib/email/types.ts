// lib/email/types.ts
export type TrainingLevel = "essentials" | "foundations" | "expert";

export interface EmailPayload {
  level: TrainingLevel;
  training: {
    date?: string;
    location?: string;
    duration?: string;
    certification?: string;
  };
  participant: {
    fullName: string;
    role: string;
    company: string;
    email: string;
    phone: string;
    compFinName?: string;
    compFinEmail?: string;
    isPCD?: boolean | null;
    pcdDescription?: string;
  };
  additionalParticipants?: Array<{
    addName: string;
    role: string;
    email: string;
    phone: string;
    isPCD?: boolean | null;
    pcdDescription?: string;
  }>;
}
