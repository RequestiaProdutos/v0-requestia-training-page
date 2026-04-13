"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { FormField } from "@/components/form/form-field";
import { getValidator } from "@/lib/form/validators";
import type { EnrollFormEssentialsProps } from "@/types/enrollment";

export function EnrollFormEssentials({
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false,
}: EnrollFormEssentialsProps) {
  const [isParticipantDataExpanded, setIsParticipantDataExpanded] =
    useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateAll = (): boolean => {
    const validators: Array<{
      name: string;
      value: string;
      validation: "name" | "email" | "phone" | "required" | "textOnly";
    }> = [
      { name: "fullName", value: formData.fullName, validation: "name" },
      { name: "role", value: formData.role, validation: "textOnly" },
      { name: "company", value: formData.company, validation: "required" },
      { name: "email", value: formData.email, validation: "email" },
      { name: "phone", value: formData.phone, validation: "phone" },
    ];

    const errors: Record<string, string> = {};
    for (const field of validators) {
      const result = getValidator(field.validation)(field.value);
      if (!result.isValid && result.error) {
        errors[field.name] = result.error;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmit(e);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      onFormDataChange({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      onFormDataChange({
        ...formData,
        [name]: value,
      });
      // Clear field error when user edits the field
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  return (
    <div className="md:col-span-2 border p-6 shadow-lg shadow-[#004680]/10 rounded-2xl flex flex-col">
      <h3 className="text-2xl font-normal text-[#00233f] mb-6">
        Dados para inscrição
      </h3>

      <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
        <div className="px-2">
          <button
            type="button"
            onClick={() =>
              setIsParticipantDataExpanded(!isParticipantDataExpanded)
            }
            className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
          >
            <h4 className="text-normal font-normal text-[#00233f]">
              Dados do participante
            </h4>
            {isParticipantDataExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#5F7990]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#5F7990]" />
            )}
          </button>

          {isParticipantDataExpanded && (
            <div className="mt-4 mb-8 space-y-4">
              {/* Full Name */}
              <div className="mb-4">
                <FormField
                  type="text"
                  name="fullName"
                  label="Nome completo"
                  placeholder="Escreva seu nome..."
                  value={formData.fullName}
                  onChange={handleInputChange}
                  validation="name"
                  externalError={fieldErrors.fullName}
                  required
                />
              </div>

              {/* Role and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField
                  type="text"
                  name="role"
                  label="Cargo/Função"
                  placeholder="Ex: Gerente"
                  value={formData.role}
                  onChange={handleInputChange}
                  validation="textOnly"
                  externalError={fieldErrors.role}
                  required
                />
                <FormField
                  type="text"
                  name="company"
                  label="Nome da Empresa"
                  placeholder="Ex: Empresa LTDA"
                  value={formData.company}
                  onChange={handleInputChange}
                  validation="required"
                  externalError={fieldErrors.company}
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  type="email"
                  name="email"
                  label="E-mail corporativo"
                  placeholder="seu@empresa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  validation="email"
                  externalError={fieldErrors.email}
                  required
                />
                <FormField
                  type="tel"
                  name="phone"
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  validation="phone"
                  externalError={fieldErrors.phone}
                  formatAsPhone
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Privacy Checkbox */}
        <div className="pt-5 border-t mt-auto">
          <div className="flex gap-3 mb-4">
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleInputChange}
              required
              className="mt-1 w-4 h-4 rounded border-gray-300 accent-[#0D5B9C] cursor-pointer"
            />
            <label className="text-xs text-[#5F7990] cursor-pointer">
              Ao enviar este formulário, concordo com a utilização de todos
              dados informados para o recebimento de contato comercial. Confirmo
              que li e concordo com a{" "}
              <a
                className="text-[#206EB0] hover:underline"
                href="https://requestia.com/politica-e-seguranca"
                target="_blank"
              >
                Política de Privacidade.
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full px-8 py-6 bg-[#0D5B9C] text-white hover:bg-[#0D5B9C]/90 font-semibold text-sm rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar inscrição"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
