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
  const [confirmationData, setConfirmationDataState] = useState<ConfirmationData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('enrollmentData')
      if (stored) {
        const data = JSON.parse(stored)
        console.log('[v0] Loaded from sessionStorage:', data)
        setConfirmationDataState(data)
      }
    } catch (error) {
      console.error('[v0] Error loading from sessionStorage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save to sessionStorage when data changes
  const setConfirmationData = (data: ConfirmationData) => {
    console.log('[v0] Setting confirmation data:', data)
    setConfirmationDataState(data)
    try {
      sessionStorage.setItem('enrollmentData', JSON.stringify(data))
      console.log('[v0] Saved to sessionStorage')
    } catch (error) {
      console.error('[v0] Error saving to sessionStorage:', error)
    }
  }

  if (!isHydrated) {
    return null
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
