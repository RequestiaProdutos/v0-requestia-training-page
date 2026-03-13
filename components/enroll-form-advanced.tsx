"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Trash2, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useAdditionalParticipants } from "@/hooks/use-additional-participants";
import type {
  AdvancedFormData,
  Level,
  AdditionalParticipantWithId,
} from "@/types/enrollment";

interface EnrollFormAdvancedProps {
  level: Extract<Level, "foundations" | "expert">;
  formData: AdvancedFormData;
  onFormDataChange: (data: AdvancedFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export function EnrollFormAdvanced({
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false,
}: EnrollFormAdvancedProps) {
  // Section expansion states
  const [isParticipantDataExpanded, setIsParticipantDataExpanded] =
    useState(true);
  const [isCompanyDataExpanded, setIsCompanyDataExpanded] = useState(true);
  const [isAddParticipantExpanded, setIsAddParticipantExpanded] =
    useState(true);

  // PCD states
  const [isPCDNeeded, setIsPCDNeeded] = useState<boolean | null>(null);
  const [pcdDescription, setPCDDescription] = useState("");

  // Additional participants hook
  const {
    participants: additionalParticipants,
    isAdding: isAddingParticipant,
    formData: formParticipant,
    editingId: editingParticipantId,
    handleAdd: handleAddParticipant,
    handleCancel,
    handleSave: handleSaveParticipant,
    handleEdit,
    handleDelete,
    handleFormChange: setFormParticipant,
  } = useAdditionalParticipants((participants) => {
    onFormDataChange({ ...formData, additionalParticipants: participants });
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  const handleEditParticipant = (participant: AdditionalParticipantWithId) => {
    handleEdit(participant);
  };

  const handleDeleteParticipant = (id: string) => {
    handleDelete(id);
  };

  const maxParticipants = 2;
  const remainingSlots = maxParticipants - additionalParticipants.length;

  return (
    <div className="md:col-span-2 border rounded-2xl shadow-lg shadow-[#004680]/10 flex flex-col h-[680px]">
      {/* Header */}
      <div className="p-6">
        <h3 className="text-2xl font-normal text-[#00233f]">
          Dados para inscrição
        </h3>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Participant Data Section */}
          <div className="mb-6 border-b pb-4">
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
                {/* FullName and Phone */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nome Completo *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                </div>

                {/* Email and Role */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail corporativo *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Cargo/Função *"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                </div>

                {/* Necessidade especial */}
                <p className="text-sm font-semibold text-[#212121]">
                  Necessidades Especiais (PCD)*
                </p>
                <p className="text-xs font-normal text-[#787979] -mt-2">
                  Para proporcionarmos uma experiência inclusiva, informe se
                  você ou algum participante é uma Pessoa com Deficiência (PCD)
                  e se há alguma necessidade especial para participação no
                  treinamento.
                </p>

                {/* PCD Radio Buttons */}
                <div className="flex items-center gap-8 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPCD"
                      checked={isPCDNeeded === true}
                      onChange={() => {
                        setIsPCDNeeded(true);
                        onFormDataChange({ ...formData, isPCD: true });
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-[#212121]">
                      Sim, sou PCD e preciso de acomodações.
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPCD"
                      checked={isPCDNeeded === false}
                      onChange={() => {
                        setIsPCDNeeded(false);
                        setPCDDescription("");
                        onFormDataChange({
                          ...formData,
                          isPCD: false,
                          pcdDescription: "",
                        });
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-[#212121]">Não</span>
                  </label>
                </div>

                {/* PCD Description */}
                <Input
                  type="text"
                  placeholder="Descreva qual a sua necessidade, caso necessário*"
                  value={pcdDescription}
                  onChange={(e) => {
                    setPCDDescription(e.target.value);
                    onFormDataChange({
                      ...formData,
                      pcdDescription: e.target.value,
                    });
                  }}
                  disabled={isPCDNeeded !== true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent disabled:bg-white disabled:text-[#DCDCDD] disabled:cursor-not-allowed"
                />
              </div>
            )}
          </div>

          {/* Dados da empresa */}
          <div className="mb-6 border-b pb-4">
            <button
              type="button"
              onClick={() => setIsCompanyDataExpanded(!isCompanyDataExpanded)}
              className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
            >
              <h4 className="text-normal font-normal text-[#00233f]">
                Dados da empresa
              </h4>
              {isCompanyDataExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#5F7990]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#5F7990]" />
              )}
            </button>

            {isCompanyDataExpanded && (
              <div className="mt-4 space-y-4">
                {/* Role and Company */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="compFinName"
                    placeholder="Nome do Responsável Financeiro da sua empresa *"
                    value={formData.compFinName}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Nome da Empresa *"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                </div>

                {/* compFinEmail */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="compFinEmail"
                    placeholder="E-mail do Responsável Financeiro da sua empresa *"
                    value={formData.compFinEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Participants */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() =>
                setIsAddParticipantExpanded(!isAddParticipantExpanded)
              }
              className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
            >
              <h4 className="text-normal font-normal text-[#00233f]">
                Participantes adicionais
              </h4>
              {isAddParticipantExpanded ? (
                <ChevronUp className="w-5 h-5 text-[#5F7990]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#5F7990]" />
              )}
            </button>

            {isAddParticipantExpanded && (
              <div className="mt-4 space-y-4">
                {/* Display saved participants */}
                {additionalParticipants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="relative flex items-start justify-between">
                      <div className="absolute left-0 right-0 top-[30px] border-b border-gray-200" />
                      <h5 className="text-sm font-medium text-[#212121] relative z-10">
                        Participante adicional {index + 1}
                      </h5>
                      <div className="flex gap-2 relative z-10">
                        <button
                          type="button"
                          onClick={() => handleEditParticipant(participant)}
                          className="p-1 hover:bg-gray-100 rounded bg-white"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteParticipant(participant.id)
                          }
                          className="p-1 hover:bg-red-50 rounded bg-white"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-[#787979] space-y-2">
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="min-w-[100px] wrap-break-word">
                          {participant.addName}
                        </span>
                        <span className="min-w-[100px] wrap-break-word">
                          {participant.email}
                        </span>
                        <span className="min-w-[100px] wrap-break-word">
                          {participant.role}
                        </span>
                        <span className="min-w-[100px] wrap-break-word">
                          {participant.phone}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-normal">PCD:</span>{" "}
                        {participant.isPCD
                          ? `Sim${participant.pcdDescription ? ` - ${participant.pcdDescription}` : ""}`
                          : "Não"}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add participant form or button */}
                {!isAddingParticipant && remainingSlots > 0 ? (
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="w-full py-3 text-sm text-center text-gray-500 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Adicionar participantes (máximo {remainingSlots})
                  </button>
                ) : isAddingParticipant ? (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h5 className="font-semibold text-[#00233f]">
                      Participante adicional {additionalParticipants.length + 1}
                    </h5>

                    {/* Form fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nome completo *"
                        value={formParticipant.addName}
                        onChange={(e) =>
                          setFormParticipant({ addName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C]"
                      />
                      <input
                        type="text"
                        placeholder="Cargo/Função *"
                        value={formParticipant.role}
                        onChange={(e) =>
                          setFormParticipant({ role: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="E-mail corporativo *"
                        value={formParticipant.email}
                        onChange={(e) =>
                          setFormParticipant({ email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C]"
                      />
                      <input
                        type="tel"
                        placeholder="Telefone *"
                        value={formParticipant.phone}
                        onChange={(e) =>
                          setFormParticipant({ phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C]"
                      />
                    </div>

                    {/* PCD Section */}
                    <div>
                      <p className="text-sm font-semibold text-[#212121]">
                        Necessidades Especiais (PCD)*
                      </p>
                      <div className="flex items-center gap-8 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={formParticipant.isPCD === true}
                            onChange={() => setFormParticipant({ isPCD: true })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-[#212121]">
                            Sim, sou PCD e preciso de acomodações.
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={formParticipant.isPCD === false}
                            onChange={() =>
                              setFormParticipant({ isPCD: false })
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-[#212121]">Não</span>
                        </label>
                      </div>

                      <Input
                        type="text"
                        placeholder="Descreva qual a sua necessidade, caso necessário*"
                        value={formParticipant.pcdDescription}
                        onChange={(e) =>
                          setFormParticipant({ pcdDescription: e.target.value })
                        }
                        disabled={formParticipant.isPCD !== true}
                        className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] disabled:bg-white disabled:text-[#DCDCDD] disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveParticipant}
                        className="flex-1 py-2 text-sm text-white bg-[#0D5B9C] rounded-lg hover:bg-[#0D5B9C]/90"
                      >
                        {editingParticipantId ? "Salvar" : "Adicionar"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="pt-5 border-t mt-auto">
            <div className="flex gap-3 mb-4">
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={(e) =>
                  onFormDataChange({
                    ...formData,
                    agreePrivacy: e.target.checked,
                  })
                }
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0D5B9C] cursor-pointer"
              />
              <label className="text-xs text-[#5F7990] cursor-pointer">
                Ao enviar este formulário, concordo com a utilização de todos
                dados informados para o recebimento de contato comercial.
                Confirmo que li e concordo com a Política de Privacidade.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-6 bg-[#0D5B9C] text-white hover:bg-[#0D5B9C]/90 font-semibold text-sm rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed"
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
        </form>
      </div>
    </div>
  );
}
