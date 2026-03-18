"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageSquareWarning, Loader2 } from "lucide-react";
import { FeedbackState, feedbackConfig } from "@/components/feedback";
import { FormField } from "@/components/form/form-field";
import { useContactForm } from "@/hooks/use-contact-form";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formData,
    isSubmitting,
    isSuccess,
    isError,
    handleInputChange,
    handleSubmit,
    reset,
  } = useContactForm();

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Contact Button */}
      <Button
        onClick={handleOpen}
        variant="outline"
        className="cursor-pointer gap-2 text-[#004680] border-[#004680] hover:bg-[#004680]/5 hover:text-[#004680]"
      >
        <MessageSquareWarning />
        Dúvidas
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 min-h-screen">
          {/* Modal */}
          <div className="bg-white rounded-3xl shadow-2xl w-[500px] min-h-[450px] p-8 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="cursor-pointer absolute top-6 right-6 p-1 hover:bg-gray-100 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Content based on status */}
            {isSuccess ? (
              <FeedbackState {...feedbackConfig.contactSuccess} />
            ) : isError ? (
              <FeedbackState {...feedbackConfig.contactError} />
            ) : (
              <ContactForm
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Componente interno do formulário
interface ContactFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  isSubmitting: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function ContactForm({
  formData,
  isSubmitting,
  onInputChange,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Entre em contato
      </h2>

      {/* Description */}
      <p className="text-sm text-[#5F7990] mb-4 shrink-0">
        Tem dúvidas sobre o treinamento? Envie sua mensagem e nossa equipe
        retornará em breve.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-3 w-full flex flex-col flex-1"
      >
        {/* Full Name Input */}
        <FormField
          type="text"
          name="name"
          label="Nome Completo"
          placeholder="Escreva seu nome..."
          value={formData.name}
          onChange={onInputChange}
          validation="name"
          required
        />

        {/* Phone Input */}
        <FormField
          type="tel"
          name="phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={onInputChange}
          validation="phone"
          formatAsPhone
          required
        />

        {/* Email Input */}
        <FormField
          type="email"
          name="email"
          label="E-mail"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={onInputChange}
          validation="email"
          required
        />

        {/* Message Textarea */}
        <textarea
          name="message"
          placeholder="Mensagem *"
          value={formData.message}
          onChange={onInputChange}
          required
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition resize-none flex-1 min-h-0"
        />

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-2 shrink-0">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            variant="outline"
            className="cursor-pointer px-6 py-2 border-2 border-[#206EB0] text-[#206EB0] hover:text-[#206EB0] hover:bg-[#206EB0]/5 font-semibold rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-2 bg-[#206EB0] text-white hover:bg-[#1a5a8f] font-semibold rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar mensagem"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
