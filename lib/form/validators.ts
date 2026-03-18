export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validação de nome (apenas letras, espaços e acentos)
export function validateName(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  // Regex para aceitar apenas letras (incluindo acentuadas), espços e hífens
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  if (!nameRegex.test(value)) {
    return { isValid: false, error: "Nome deve conter apenas letras" };
  }

  if (value.trim().length < 3) {
    return { isValid: false, error: "Nome deve ter pelo menos 3 caracteres" };
  }

  return { isValid: true };
}

// Blacklist de domínios de e-mail pessoais (não institucionais)
const EMAIL_DOMAIN_BLACKLIST = [
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "yahoo.com.br",
  "google.com",
  "mailsphere.xyz",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "bol.com",
  "uol.com",
  "terra.com",
  "ig.com",
  "icloud.com",
  "deskmanager.com",
  "qualitor.com",
];

// Validação para e-mail (corporativo/institucional)
export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return { isValid: false, error: "E-mail inválido" };
  }

  // Extrai o domínio do e-mail e verifica na blacklist
  const domain = value.split("@")[1]?.toLowerCase();
  if (domain && EMAIL_DOMAIN_BLACKLIST.includes(domain)) {
    return {
      isValid: false,
      error: "Por favor, utilize um e-mail corporativo",
    };
  }

  return { isValid: true };
}

// Validação de telefone (aceita formatos brasileiros)
export function validatePhone(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  // Remove caracteres não numéricos para validação
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length < 10 || numbersOnly.length > 11) {
    return { isValid: false, error: "Telefone deve conter 10 ou 11 dígitos" };
  }

  return { isValid: true };
}

// Validação de texto obrigatório (genérico)
export function validateRequired(
  value: string,
  fieldName?: string,
): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      error: fieldName ? `${fieldName} é obrigatório` : "Campo obrigatório",
    };
  }

  return { isValid: true };
}

// Validação de texto sem números
export function validateTextOnly(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, error: "Campo obrigatório" };
  }

  if (/\d/.test(value)) {
    return { isValid: false, error: "Este campo não pode conter números" };
  }

  return { isValid: true };
}

// Tipo para regras de validação
export type ValidationType =
  | "name"
  | "email"
  | "phone"
  | "required"
  | "textOnly";

// Função que retorna o validador apropriado
export function getValidator(
  type: ValidationType,
): (value: string) => ValidationResult {
  switch (type) {
    case "name":
      return validateName;
    case "email":
      return validateEmail;
    case "phone":
      return validatePhone;
    case "textOnly":
      return validateTextOnly;
    case "required":
    default:
      return validateRequired;
  }
}

// Formatar telefone enquanto digita
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

// Interface para erros de campo
export interface FieldErrors {
  [key: string]: string;
}

// Validar participante adicional
export function validateAdditionalParticipant(participant: {
  addName: string;
  email: string;
  phone: string;
  role: string;
  isPCD: boolean | null;
}): FieldErrors {
  const errors: FieldErrors = {};

  const nameResult = validateName(participant.addName);
  if (!nameResult.isValid) errors.addName = nameResult.error!;

  const emailResult = validateEmail(participant.email);
  if (!emailResult.isValid) errors.email = emailResult.error!;

  const phoneResult = validatePhone(participant.phone);
  if (!phoneResult.isValid) errors.phone = phoneResult.error!;

  const roleResult = validateTextOnly(participant.role);
  if (!roleResult.isValid) errors.role = roleResult.error!;

  if (participant.isPCD === null) {
    errors.isPCD = "Por favor, selecione uma opção de PCD";
  }

  return errors;
}

// Validar formulário principal (Advanced - Foundations/Expert)
export function validateAdvancedForm(formData: {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  compFinName: string;
  compFinEmail: string;
  isPCD: boolean | null;
}): FieldErrors {
  const errors: FieldErrors = {};

  const fullNameResult = validateName(formData.fullName);
  if (!fullNameResult.isValid) errors.fullName = fullNameResult.error!;

  const emailResult = validateEmail(formData.email);
  if (!emailResult.isValid) errors.email = emailResult.error!;

  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.isValid) errors.phone = phoneResult.error!;

  const roleResult = validateTextOnly(formData.role);
  if (!roleResult.isValid) errors.role = roleResult.error!;

  const companyResult = validateRequired(formData.company, "Empresa");
  if (!companyResult.isValid) errors.company = companyResult.error!;

  const compFinNameResult = validateName(formData.compFinName);
  if (!compFinNameResult.isValid) errors.compFinName = compFinNameResult.error!;

  const compFinEmailResult = validateEmail(formData.compFinEmail);
  if (!compFinEmailResult.isValid)
    errors.compFinEmail = compFinEmailResult.error!;

  if (formData.isPCD === null) {
    errors.isPCD = "Por favor, selecione uma opção de PCD";
  }

  return errors;
}
