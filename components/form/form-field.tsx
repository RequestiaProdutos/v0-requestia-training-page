"use client";

import { useState, useCallback } from "react";
import {
  getValidator,
  formatPhone,
  type ValidationType,
} from "@/lib/form/validators";

interface FormFieldProps {
  type?: "text" | "email" | "tel";
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: ValidationType;
  required?: boolean;
  className?: string;
  formatAsPhone?: boolean;
  externalError?: string;
}

export function FormField({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  validation,
  required = false,
  className = "",
  formatAsPhone = false,
  externalError,
}: FormFieldProps) {
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const validate = useCallback(
    (val: string) => {
      if (!validation) return;

      const validator = getValidator(validation);
      const result = validator(val);

      if (!result.isValid) {
        setError(result.error);
      } else {
        setError(undefined);
      }
    },
    [validation],
  );

  const handleBlur = () => {
    setTouched(true);
    validate(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Formatar telefone se necessário
    if (formatAsPhone) {
      newValue = formatPhone(newValue);
      e.target.value = newValue;
    }

    onChange(e);

    // Se já foi tocado, validar em tempo real
    if (touched) {
      validate(newValue);
    }
  };

  // External error takes priority, then internal error
  const displayError = externalError || (touched ? error : undefined);
  const hasError = !!displayError;

  const baseClasses =
    "w-full px-4 py-2 border rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition";
  const normalClasses = "border-gray-300 focus:ring-[#0D5B9C]";
  const errorClasses = "border-red-500 focus:ring-red-500 bg-red-50";

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={`${baseClasses} ${hasError ? errorClasses : normalClasses} ${className}`}
      />
      {hasError && <p className="mt-1 text-xs text-red-500">{displayError}</p>}
    </div>
  );
}
