// types/enrollment.ts
// Tipos centralizados para o sistema de inscrição de treinamentos

// ============================================
// TIPOS BASE E ENUMS
// ============================================

// Nível de treinamento
export type Level = "essentials" | "foundations" | "expert";

// ============================================
// DADOS DE PESSOA (BASE REUTILIZÁVEL)
// ============================================

// Informações básicas de contato de uma pessoa
export interface PersonContact {
  email: string;
  phone: string;
}

// Informações profissionais de uma pessoa
export interface PersonProfessional {
  role: string;
  company: string;
}

// Dados de acessibilidade (PCD)
export interface AccessibilityData {
  isPCD?: boolean | null;
  pcdDescription?: string;
}

// ============================================
// SESSÃO DE TREINAMENTO
// ============================================

export interface TrainingSession {
  id: string;
  date: string;
  location: string;
  duration: string;
}

// Informações de exibição do nível
export interface LevelDisplayInfo {
  level: string;
  levelNumber: string;
  levelName: string;
  levelColor: string;
}

// ============================================
// PARTICIPANTES
// ============================================

// Participante adicional base
export interface AdditionalParticipant
  extends PersonContact, AccessibilityData {
  addName: string;
  role: string;
}

// Participante adicional com ID (usado internamente nos formulários)
export interface AdditionalParticipantWithId extends Omit<
  AdditionalParticipant,
  "isPCD" | "pcdDescription"
> {
  id: string;
  company: string;
  isPCD: boolean | null;
  pcdDescription: string;
}

// ============================================
// DADOS DE FORMULÁRIO
// ============================================

// Dados do formulário base (campos comuns a todos os níveis)
export interface BaseFormData extends PersonContact, PersonProfessional {
  fullName: string;
  agreePrivacy: boolean;
  additionalParticipants?: AdditionalParticipant[];
}

// Dados do formulário Essentials
export type EssentialsFormData = BaseFormData;

// Campos extras para formulários avançados (Foundations/Expert)
export interface AdvancedFormFields extends AccessibilityData {
  experience?: string;
  department?: string;
  currentSolution?: string;
  goals?: string;
  budget?: string;
  compFinName?: string;
  compFinEmail?: string;
}

// Dados do formulário Foundations/Expert
export interface AdvancedFormData extends BaseFormData, AdvancedFormFields {}

// ============================================
// DADOS DE CONFIRMAÇÃO
// ============================================

// Dados de confirmação exibidos na página de confirmação
export interface ConfirmationData
  extends
    LevelDisplayInfo,
    Pick<TrainingSession, "date" | "location" | "duration">,
    PersonContact,
    PersonProfessional,
    AccessibilityData {
  certification: string;
  fullName: string;
  compFinName?: string;
  compFinEmail?: string;
  additionalParticipants?: AdditionalParticipant[];
}

// ============================================
// PROPS DE COMPONENTES
// ============================================

// Props do EnrollModal
export interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  session?: TrainingSession | null;
}

// Props base para formulários de inscrição (genérico)
export interface BaseEnrollFormProps<T> {
  formData: T;
  onFormDataChange: (data: T) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

// Props específicas dos formulários
export type EnrollFormEssentialsProps = BaseEnrollFormProps<EssentialsFormData>;
export type EnrollFormFoundationsProps = BaseEnrollFormProps<AdvancedFormData>;
export type EnrollFormExpertProps = BaseEnrollFormProps<AdvancedFormData>;
