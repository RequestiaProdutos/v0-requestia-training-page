"use client";

interface FeedbackStateProps {
  type: "success" | "error";
  title: string;
  message: string;
  iconSrc?: string;
}

const defaultIcons = {
  success: "/success.svg",
  error: "/error.svg",
};

export function FeedbackState({
  type,
  title,
  message,
  iconSrc,
}: FeedbackStateProps) {
  const icon = iconSrc || defaultIcons[type];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
      <div className="relative mb-8">
        <img src={icon} alt={type === "success" ? "sucesso" : "erro"} />
      </div>

      <h2 className="text-2xl font-bold text-[#003765] mb-4">{title}</h2>
      <p className="text-[#5F7990] text-base max-w-[300px]">{message}</p>
    </div>
  );
}

// Configurações pré-definidas para feedback comum
export const feedbackConfig = {
  contactSuccess: {
    type: "success" as const,
    title: "Agradecemos o seu contato!",
    message: "Recebemos a sua mensagem. Logo entraremos em contato com você.",
  },
  contactError: {
    type: "error" as const,
    title: "Algo deu errado",
    message:
      "Não foi possível concluir a solicitação. Tente novamente em alguns instantes.",
  },
  enrollmentSuccess: {
    type: "success" as const,
    title: "Inscrição realizada!",
    message:
      "Sua inscrição foi concluída com sucesso. Em breve você receberá um e-mail de confirmação.",
  },
  enrollmentError: {
    type: "error" as const,
    title: "Erro na inscrição",
    message:
      "Não foi possível concluir sua inscrição. Tente novamente em alguns instantes.",
  },
};
