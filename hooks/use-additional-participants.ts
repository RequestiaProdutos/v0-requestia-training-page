"use client";

import { useState, useCallback } from "react";
import type {
  AdditionalParticipantWithId,
  AdditionalParticipant,
} from "@/types/enrollment";

interface ParticipantFormData {
  addName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  isPCD: boolean | null;
  pcdDescription: string;
}

const initialFormData: ParticipantFormData = {
  addName: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  isPCD: null,
  pcdDescription: "",
};

interface UseAdditionalParticipantsReturn {
  participants: AdditionalParticipantWithId[];
  isAdding: boolean;
  formData: ParticipantFormData;
  editingId: string | null;
  handleAdd: () => void;
  handleCancel: () => void;
  handleSave: () => AdditionalParticipant[];
  handleEdit: (participant: AdditionalParticipantWithId) => void;
  handleDelete: (id: string) => AdditionalParticipant[];
  handleFormChange: (data: Partial<ParticipantFormData>) => void;
}

export function useAdditionalParticipants(
  onParticipantsChange?: (participants: AdditionalParticipant[]) => void,
): UseAdditionalParticipantsReturn {
  const [participants, setParticipants] = useState<
    AdditionalParticipantWithId[]
  >([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] =
    useState<ParticipantFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Converte participantes com ID para formato de envio
  const toParticipantList = useCallback(
    (list: AdditionalParticipantWithId[]): AdditionalParticipant[] => {
      return list.map((p) => ({
        addName: p.addName,
        role: p.role,
        email: p.email,
        phone: p.phone,
        isPCD: p.isPCD,
        pcdDescription: p.pcdDescription,
      }));
    },
    [],
  );

  const handleAdd = useCallback(() => {
    setIsAdding(true);
    setEditingId(null);
    setFormData(initialFormData);
  }, []);

  const handleCancel = useCallback(() => {
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialFormData);
  }, []);

  const handleSave = useCallback((): AdditionalParticipant[] => {
    let updatedParticipants: AdditionalParticipantWithId[];

    if (editingId) {
      // Atualizar existente
      updatedParticipants = participants.map((p) =>
        p.id === editingId ? { ...p, ...formData } : p,
      );
      setEditingId(null);
    } else {
      // Adicionar novo
      const newParticipant: AdditionalParticipantWithId = {
        id: Date.now().toString(),
        ...formData,
      };
      updatedParticipants = [...participants, newParticipant];
    }

    setParticipants(updatedParticipants);
    setIsAdding(false);
    setFormData(initialFormData);

    const participantList = toParticipantList(updatedParticipants);
    onParticipantsChange?.(participantList);

    return participantList;
  }, [
    editingId,
    formData,
    participants,
    toParticipantList,
    onParticipantsChange,
  ]);

  const handleEdit = useCallback((participant: AdditionalParticipantWithId) => {
    setEditingId(participant.id);
    setFormData({
      addName: participant.addName,
      company: participant.company,
      role: participant.role,
      email: participant.email,
      phone: participant.phone,
      isPCD: participant.isPCD,
      pcdDescription: participant.pcdDescription,
    });
    setIsAdding(true);
  }, []);

  const handleDelete = useCallback(
    (id: string): AdditionalParticipant[] => {
      const updatedParticipants = participants.filter((p) => p.id !== id);
      setParticipants(updatedParticipants);

      const participantList = toParticipantList(updatedParticipants);
      onParticipantsChange?.(participantList);

      return participantList;
    },
    [participants, toParticipantList, onParticipantsChange],
  );

  const handleFormChange = useCallback((data: Partial<ParticipantFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  return {
    participants,
    isAdding,
    formData,
    editingId,
    handleAdd,
    handleCancel,
    handleSave,
    handleEdit,
    handleDelete,
    handleFormChange,
  };
}
