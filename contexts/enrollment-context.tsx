'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

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
  date: string
  location: string
  duration: string
  certification: string
  fullName: string
  role: string
  company: string
  email: string
  phone: string
  compFinName?: string
  compFinEmail?: string
  isPCD?: boolean | null
  pcdDescription?: string
  additionalParticipants?: AdditionalParticipant[]
}

interface EnrollmentContextType {
  confirmationData: ConfirmationData | null
  setConfirmationData: (data: ConfirmationData) => void
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [confirmationData, setConfirmationDataState] = useState<ConfirmationData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('enrollmentData')
      if (stored) {
        const data = JSON.parse(stored)
        setConfirmationDataState(data)
      }
    } catch (error) {
      console.error('Error loading from sessionStorage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save to sessionStorage when data changes
  const setConfirmationData = (data: ConfirmationData) => {
    setConfirmationDataState(data)
    try {
      sessionStorage.setItem('enrollmentData', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to sessionStorage:', error)
    }
  }

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
