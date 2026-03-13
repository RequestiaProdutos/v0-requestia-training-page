"use client";

import { FormInput } from "./form-input";

interface PCDSectionProps {
  isPCD: boolean | null;
  pcdDescription: string;
  onIsPCDChange: (value: boolean) => void;
  onDescriptionChange: (value: string) => void;
}

export function PCDSection({
  isPCD,
  pcdDescription,
  onIsPCDChange,
  onDescriptionChange,
}: PCDSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-[#212121]">
        Você é uma pessoa com deficiência (PCD) e precisa de alguma acomodação
        especial?
      </p>

      <div className="flex items-center gap-8 mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="isPCD"
            checked={isPCD === true}
            onChange={() => onIsPCDChange(true)}
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
            checked={isPCD === false}
            onChange={() => onIsPCDChange(false)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm text-[#212121]">Não</span>
        </label>
      </div>

      <FormInput
        placeholder="Descreva qual a sua necessidade, caso necessário*"
        value={pcdDescription}
        onChange={onDescriptionChange}
        disabled={isPCD !== true}
      />
    </div>
  );
}
