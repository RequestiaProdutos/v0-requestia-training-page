"use client";

import { Input } from "@/components/ui/input";

interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: FormInputProps) {
  const baseClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5B9C] focus:border-transparent";
  const disabledClasses = disabled
    ? "disabled:bg-white disabled:text-[#DCDCDD] disabled:cursor-not-allowed"
    : "";

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    />
  );
}
