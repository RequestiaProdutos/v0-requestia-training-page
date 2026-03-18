"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { FormField } from "@/components/form/form-field";
import type { EnrollFormEssentialsProps } from "@/types/enrollment";

export function EnrollFormEssentials({
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false,
}: EnrollFormEssentialsProps) {
  const [isParticipantDataExpanded, setIsParticipantDataExpanded] =
    useState(true);

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
    }
  };

  return (
    <div className="md:col-span-2 border p-6 shadow-lg shadow-[#004680]/10 rounded-2xl flex flex-col h-[65vh]">
      <h3 className="text-2xl font-normal text-[#00233f] mb-6">
        Dados para inscrição
      </h3>

      <form className="flex flex-col flex-1" onSubmit={onSubmit}>
        <div className="flex-1 overflow-y-auto no-scrollbar px-2">
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
            <div className="mt-4 space-y-4">
              {/* Full Name */}
              <div className="mb-4">
                <FormField
                  type="text"
                  name="fullName"
                  placeholder="Nome completo *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  validation="name"
                  required
                />
              </div>

              {/* Role and Company */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  type="text"
                  name="role"
                  placeholder="Cargo/Função *"
                  value={formData.role}
                  onChange={handleInputChange}
                  validation="textOnly"
                  required
                />
                <FormField
                  type="text"
                  name="company"
                  placeholder="Nome da Empresa *"
                  value={formData.company}
                  onChange={handleInputChange}
                  validation="required"
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  type="email"
                  name="email"
                  placeholder="E-mail corporativo *"
                  value={formData.email}
                  onChange={handleInputChange}
                  validation="email"
                  required
                />
                <FormField
                  type="tel"
                  name="phone"
                  placeholder="Telefone *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  validation="phone"
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
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0D5B9C] cursor-pointer"
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
            className="w-full px-8 py-6 bg-[#0D5B9C] text-white hover:bg-[#0D5B9C]/90 font-semibold text-sm rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
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
