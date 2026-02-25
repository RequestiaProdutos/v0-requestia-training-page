'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

interface AdditionalParticipant {
  addName: string
  role: string
  email: string
  phone: string
}

interface ConfirmationData {
  level: string
  levelNumber: string
  levelName: string
  levelColor: string
  fullName: string
  role: string
  company: string
  email: string
  phone: string
  compFinName?: string
  compFinEmail?: string
  additionalParticipants?: AdditionalParticipant[]
}

interface EnrollmentContextType {
  confirmationData: ConfirmationData | null
  setConfirmationData: (data: ConfirmationData) => void
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null)

  return (
    <EnrollmentContext.Provider value={{ confirmationData, setConfirmationData }}>
      {children}
    </EnrollmentContext.Provider>
  )
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext)
  if (context === undefined) {
    throw new Error('useEnrollment must be used within EnrollmentProvider')
  }
  return context
}
