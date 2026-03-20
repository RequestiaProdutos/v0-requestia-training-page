"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit2, Trash2, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { FormField } from "@/components/form/form-field";
import { useAdditionalParticipants } from "@/hooks/use-additional-participants";
import {
  validateAdvancedForm,
  validateAdditionalParticipant,
  type FieldErrors,
} from "@/lib/form/validators";
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
  const [isCompanyDataExpanded, setIsCompanyDataExpanded] = useState(false);
  const [isAddParticipantExpanded, setIsAddParticipantExpanded] =
    useState(false);

  // Accordion behavior - only one section open at a time
  const toggleParticipantData = () => {
    const newState = !isParticipantDataExpanded;
    setIsParticipantDataExpanded(newState);
    if (newState) {
      setIsCompanyDataExpanded(false);
      setIsAddParticipantExpanded(false);
    }
  };

  const toggleCompanyData = () => {
    const newState = !isCompanyDataExpanded;
    setIsCompanyDataExpanded(newState);
    if (newState) {
      setIsParticipantDataExpanded(false);
      setIsAddParticipantExpanded(false);
    }
  };

  const toggleAddParticipant = () => {
    const newState = !isAddParticipantExpanded;
    setIsAddParticipantExpanded(newState);
    if (newState) {
      setIsParticipantDataExpanded(false);
      setIsCompanyDataExpanded(false);
    }
  };

  // PCD states
  const [isPCDNeeded, setIsPCDNeeded] = useState<boolean | null>(null);
  const [pcdDescription, setPCDDescription] = useState("");

  // Form validation errors
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [participantErrors, setParticipantErrors] = useState<FieldErrors>({});

  // Additional participants hook
  const {
    participants: additionalParticipants,
    isAdding: isAddingParticipant,
    formData: formParticipant,
    editingId: editingParticipantId,
    handleAdd: handleAddParticipant,
    handleCancel: handleCancelParticipant,
    handleSave: saveParticipant,
    handleEdit,
    handleDelete,
    handleFormChange: setFormParticipant,
  } = useAdditionalParticipants((participants) => {
    onFormDataChange({ ...formData, additionalParticipants: participants });
  });

  const handleCancel = () => {
    setParticipantErrors({});
    handleCancelParticipant();
  };

  const handleSaveParticipant = () => {
    const errors = validateAdditionalParticipant(formParticipant);
    if (Object.keys(errors).length > 0) {
      setParticipantErrors(errors);
      return;
    }
    setParticipantErrors({});
    saveParticipant();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all form fields
    const errors = validateAdvancedForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      company: formData.company,
      compFinName: formData.compFinName ?? "",
      compFinEmail: formData.compFinEmail ?? "",
      isPCD: isPCDNeeded,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Expand sections with errors
      if (
        errors.fullName ||
        errors.email ||
        errors.phone ||
        errors.role ||
        errors.isPCD
      ) {
        setIsParticipantDataExpanded(true);
      }
      if (errors.company || errors.compFinName || errors.compFinEmail) {
        setIsCompanyDataExpanded(true);
      }
      return;
    }

    // Clear errors and submit
    setFormErrors({});
    onSubmit(e);
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
    <div className="md:col-span-2 border rounded-2xl shadow-lg shadow-[#004680]/10 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <h3 className="text-2xl font-normal text-[#00233f]">
          Dados para inscrição
        </h3>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6">
        <form onSubmit={validateAndSubmit} className="space-y-4">
          {/* Participant Data Section */}
          <div className="mb-6 border-b pb-4">
            <button
              type="button"
              onClick={toggleParticipantData}
              className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity cursor-pointer"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormField
                    type="text"
                    name="fullName"
                    label="Nome Completo"
                    placeholder="Escreva seu nome..."
                    value={formData.fullName}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.fullName)
                        setFormErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    validation="name"
                    externalError={formErrors.fullName}
                    required
                  />
                  <FormField
                    type="tel"
                    name="phone"
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.phone)
                        setFormErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    validation="phone"
                    formatAsPhone
                    externalError={formErrors.phone}
                    required
                  />
                </div>

                {/* Email and Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    type="email"
                    name="email"
                    label="E-mail corporativo"
                    placeholder="seu@empresa.com"
                    value={formData.email}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.email)
                        setFormErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    validation="email"
                    externalError={formErrors.email}
                    required
                  />
                  <FormField
                    type="text"
                    name="role"
                    label="Cargo/Função"
                    placeholder="Ex: Gerente"
                    value={formData.role}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.role)
                        setFormErrors((prev) => ({ ...prev, role: "" }));
                    }}
                    validation="textOnly"
                    externalError={formErrors.role}
                    required
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
                        setFormErrors((prev) => ({ ...prev, isPCD: "" }));
                        onFormDataChange({ ...formData, isPCD: true });
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-[#212121]">
                      Sim, sou PCD e preciso de acomodações
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPCD"
                      checked={isPCDNeeded === false}
                      onChange={() => {
                        setIsPCDNeeded(false);
                        setFormErrors((prev) => ({ ...prev, isPCD: "" }));
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
                {formErrors.isPCD && (
                  <p className="text-xs text-red-500 mt-1">
                    {formErrors.isPCD}
                  </p>
                )}

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
              onClick={toggleCompanyData}
              className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity cursor-pointer"
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="sm:col-span-2">
                    <FormField
                      type="text"
                      name="compFinName"
                      label="Nome do Responsável Financeiro"
                      placeholder="Escreva o nome..."
                      value={formData.compFinName ?? ""}
                      onChange={(e) => {
                        handleInputChange(e);
                        if (formErrors.compFinName)
                          setFormErrors((prev) => ({
                            ...prev,
                            compFinName: "",
                          }));
                      }}
                      validation="name"
                      externalError={formErrors.compFinName}
                      required
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FormField
                      type="text"
                      name="company"
                      label="Nome da Empresa"
                      placeholder="Ex: Empresa LTDA"
                      value={formData.company}
                      onChange={(e) => {
                        handleInputChange(e);
                        if (formErrors.company)
                          setFormErrors((prev) => ({ ...prev, company: "" }));
                      }}
                      validation="required"
                      externalError={formErrors.company}
                      required
                    />
                  </div>
                </div>

                {/* compFinEmail */}
                <div className="mb-4">
                  <FormField
                    type="email"
                    name="compFinEmail"
                    label="E-mail do Responsável Financeiro"
                    placeholder="email@empresa.com"
                    value={formData.compFinEmail ?? ""}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (formErrors.compFinEmail)
                        setFormErrors((prev) => ({
                          ...prev,
                          compFinEmail: "",
                        }));
                    }}
                    validation="email"
                    externalError={formErrors.compFinEmail}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Participants */}
          <div className="mb-6">
            <button
              type="button"
              onClick={toggleAddParticipant}
              className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity cursor-pointer"
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
                    className="w-full py-3 text-sm text-center text-gray-500 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Adicionar participantes (máximo {remainingSlots})
                  </button>
                ) : isAddingParticipant ? (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h5 className="font-semibold text-[#00233f]">
                      {editingParticipantId
                        ? `Editando participante adicional ${additionalParticipants.findIndex((p) => p.id === editingParticipantId) + 1}`
                        : `Participante adicional ${additionalParticipants.length + 1}`}
                    </h5>

                    {/* Form fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        type="text"
                        name="addName"
                        label="Nome completo"
                        placeholder="Escreva o nome..."
                        value={formParticipant.addName}
                        onChange={(e) => {
                          setFormParticipant({ addName: e.target.value });
                          if (participantErrors.addName)
                            setParticipantErrors((prev) => ({
                              ...prev,
                              addName: "",
                            }));
                        }}
                        validation="name"
                        externalError={participantErrors.addName}
                        required
                      />
                      <FormField
                        type="text"
                        name="role"
                        label="Cargo/Função"
                        placeholder="Ex: Gerente"
                        value={formParticipant.role}
                        onChange={(e) => {
                          setFormParticipant({ role: e.target.value });
                          if (participantErrors.role)
                            setParticipantErrors((prev) => ({
                              ...prev,
                              role: "",
                            }));
                        }}
                        validation="textOnly"
                        externalError={participantErrors.role}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        type="email"
                        name="email"
                        label="E-mail corporativo"
                        placeholder="email@empresa.com"
                        value={formParticipant.email}
                        onChange={(e) => {
                          setFormParticipant({ email: e.target.value });
                          if (participantErrors.email)
                            setParticipantErrors((prev) => ({
                              ...prev,
                              email: "",
                            }));
                        }}
                        validation="email"
                        externalError={participantErrors.email}
                        required
                      />
                      <FormField
                        type="tel"
                        name="phone"
                        label="Telefone"
                        placeholder="(00) 00000-0000"
                        value={formParticipant.phone}
                        onChange={(e) => {
                          setFormParticipant({ phone: e.target.value });
                          if (participantErrors.phone)
                            setParticipantErrors((prev) => ({
                              ...prev,
                              phone: "",
                            }));
                        }}
                        validation="phone"
                        formatAsPhone
                        externalError={participantErrors.phone}
                        required
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
                            onChange={() => {
                              setFormParticipant({ isPCD: true });
                              setParticipantErrors((prev) => ({
                                ...prev,
                                isPCD: "",
                              }));
                            }}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-[#212121]">
                            Sim, o participante é PCD e precisa de acomodações
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={formParticipant.isPCD === false}
                            onChange={() => {
                              setFormParticipant({ isPCD: false });
                              setParticipantErrors((prev) => ({
                                ...prev,
                                isPCD: "",
                              }));
                            }}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-[#212121]">Não</span>
                        </label>
                      </div>
                      {participantErrors.isPCD && (
                        <p className="text-xs text-red-500 mt-1">
                          {participantErrors.isPCD}
                        </p>
                      )}

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
                        className="flex-1 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveParticipant}
                        className="flex-1 py-2 text-sm text-white bg-[#0D5B9C] rounded-lg hover:bg-[#0D5B9C]/90 cursor-pointer"
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
                className="mt-1 w-4 h-4 rounded border-gray-300 accent-[#0D5B9C] cursor-pointer"
              />
              <label className="text-xs text-[#5F7990] cursor-pointer">
                Ao enviar este formulário, concordo com a utilização de todos
                dados informados para o recebimento de contato comercial.
                Confirmo que li e concordo com a{" "}
                <a
                  className="text-[#206EB0] hover:underline"
                  href="https://requestia.com/politica-e-seguranca"
                  target="_blank"
                >
                  Política de Privacidade.
                </a>
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
