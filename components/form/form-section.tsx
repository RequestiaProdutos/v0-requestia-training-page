"use client";

import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  title,
  isOpen,
  onToggle,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-base font-semibold text-[#212121]">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="pb-6 space-y-4">{children}</div>}
    </div>
  );
}
