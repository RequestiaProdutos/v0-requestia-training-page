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
  label: string;
  placeholder?: string;
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
  label,
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
  const [isFocused, setIsFocused] = useState(false);

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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

  // Label should float when focused or has value
  // Only stay in center when there's an error, no value, AND not focused
  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`
          absolute left-3 px-1 transition-all duration-200 pointer-events-none
          whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-24px)]
          ${
            shouldFloat
              ? "-top-2.5 text-xs bg-white"
              : "top-1/2 -translate-y-1/2 text-sm bg-transparent"
          }
          ${
            hasError
              ? "text-red-500"
              : isFocused
                ? "text-[#0D5B9C]"
                : "text-gray-500"
          }
        `}
      >
        {label}
        {required && " *"}
      </label>

      {/* Input */}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={shouldFloat ? placeholder : ""}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className={`
          w-full px-4 py-3 border rounded-lg text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:border-transparent transition-all
          ${
            hasError
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-[#0D5B9C] focus:border-[#0D5B9C]"
          }
          ${shouldFloat ? "placeholder-gray-400" : "placeholder-transparent"}
        `}
      />

      {/* Error Message */}
      {hasError && <p className="mt-1 text-xs text-red-500">{displayError}</p>}
    </div>
  );
}
