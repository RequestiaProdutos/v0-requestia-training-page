"use client";

import { useState, useCallback } from "react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (status === "submitting") return;
      setStatus("submitting");

      try {
        const response = await fetch("/api/send-email-contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Falha ao enviar mensagem");
        }

        setStatus("success");
        setFormData(initialFormData);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        setStatus("error");
      }
    },
    [formData, status],
  );

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setStatus("idle");
  }, []);

  return {
    formData,
    status,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
    handleInputChange,
    handleSubmit,
    reset,
  };
}
