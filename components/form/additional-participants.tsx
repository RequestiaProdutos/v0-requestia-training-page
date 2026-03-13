"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";
import { FormInput } from "./form-input";
import { PCDSection } from "./pcd-section";
import type { AdditionalParticipantWithId } from "@/types/enrollment";

interface ParticipantFormData {
  addName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  isPCD: boolean | null;
  pcdDescription: string;
}

interface AdditionalParticipantsProps {
  participants: AdditionalParticipantWithId[];
  isAdding: boolean;
  formData: ParticipantFormData;
  editingId: string | null;
  onAdd: () => void;
  onCancel: () => void;
  onSave: () => void;
  onEdit: (participant: AdditionalParticipantWithId) => void;
  onDelete: (id: string) => void;
  onFormChange: (data: Partial<ParticipantFormData>) => void;
}

export function AdditionalParticipants({
  participants,
  isAdding,
  formData,
  editingId,
  onAdd,
  onCancel,
  onSave,
  onEdit,
  onDelete,
  onFormChange,
}: AdditionalParticipantsProps) {
  return (
    <div className="space-y-4">
      {/* Lista de participantes */}
      {participants.map((participant, index) => (
        <div
          key={participant.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600">
            {index + 1}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{participant.addName}</p>
            <p className="text-sm text-gray-600">{participant.email}</p>
            <p className="text-sm text-gray-600">{participant.role}</p>
            <p className="text-sm text-gray-600">{participant.phone}</p>
            <p className="text-sm text-gray-600">
              Necessidades Especiais (PCD):{" "}
              {participant.isPCD === null
                ? "—"
                : participant.isPCD
                  ? "Sim"
                  : "Não"}
            </p>
            {participant.isPCD && participant.pcdDescription && (
              <p className="text-sm text-gray-600">
                Descrição: {participant.pcdDescription}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(participant)}
              className="p-2 text-gray-500 hover:text-[#0D5B9C] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(participant.id)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Formulário de adição/edição */}
      {isAdding ? (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              placeholder="Nome completo*"
              value={formData.addName}
              onChange={(value) => onFormChange({ addName: value })}
              required
            />
            <FormInput
              placeholder="E-mail corporativo*"
              value={formData.email}
              onChange={(value) => onFormChange({ email: value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              placeholder="Cargo*"
              value={formData.role}
              onChange={(value) => onFormChange({ role: value })}
              required
            />
            <FormInput
              placeholder="Telefone*"
              value={formData.phone}
              onChange={(value) => onFormChange({ phone: value })}
              required
            />
          </div>

          <PCDSection
            isPCD={formData.isPCD}
            pcdDescription={formData.pcdDescription}
            onIsPCDChange={(value) => {
              onFormChange({
                isPCD: value,
                pcdDescription: value ? formData.pcdDescription : "",
              });
            }}
            onDescriptionChange={(value) =>
              onFormChange({ pcdDescription: value })
            }
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className="flex-1 bg-[#0D5B9C] hover:bg-[#0D5B9C]/90"
            >
              {editingId ? "Salvar alterações" : "Adicionar"}
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 text-[#0D5B9C] hover:text-[#0D5B9C]/80 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Adicionar participante
        </button>
      )}
    </div>
  );
}
