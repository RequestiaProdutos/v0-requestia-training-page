'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollment } from '@/contexts/enrollment-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { EnrollFormEssentials } from '@/components/enroll-form-essentials'
import { EnrollFormFoundations } from '@/components/enroll-form-foundations'
import { EnrollFormExpert } from '@/components/enroll-form-expert'

interface EnrollModalProps {
  isOpen: boolean
  onClose: () => void
  level: 'essentials' | 'foundations' | 'expert'
}

interface FormData {
  fullName: string
  role: string
  company: string
  email: string
  phone: string
  agreePrivacy: boolean
  experience?: string
  department?: string
  currentSolution?: string
  goals?: string
  budget?: string
  compFinName?: string
  compFinEmail?: string
  isPCD?: boolean | null
  pcdDescription?: string
  additionalParticipants?: Array<{
    addName: string
    role: string
    email: string
    phone: string
  }>
}

export function EnrollModal({ isOpen, onClose, level }: EnrollModalProps) {
  const router = useRouter()
  const { setConfirmationData } = useEnrollment()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    agreePrivacy: false,
    experience: '',
    department: '',
    currentSolution: '',
    goals: '',
    budget: '',
    compFinName: '',
    compFinEmail: '',
    isPCD: null,
    pcdDescription: '',
    additionalParticipants: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] handleSubmit called with level:', level)

    // Only redirect to confirmation for Foundations and Expert
    if (level === 'essentials') {
      console.log('[v0] Level is essentials, closing modal')
      onClose()
      return
    }

    console.log('[v0] Preparing confirmation data')

    // Get training details based on level
    const trainingDetails = level === 'foundations' 
      ? {
          date: '4 a 6 de maio de 2026',
          location: 'Campinas, SP',
          duration: '3 dias intensivos',
          certification: 'Requestia Foundations'
        }
      : {
          date: 'A confirmar',
          location: 'A confirmar',
          duration: '5 dias intensivos',
          certification: 'Requestia Expert'
        }

    // Prepare confirmation data
    const confirmationData = {
      level: level,
      levelNumber: level === 'foundations' ? 'Nível 2' : 'Nível 3',
      levelName: level === 'foundations' ? 'Requestia Foundations' : 'Requestia Expert',
      levelColor: level === 'foundations' ? 'from-[#6F8EAA] to-[#B3C6D9]' : 'from-[#E7B15C] to-[#DE9627]',
      date: trainingDetails.date,
      location: trainingDetails.location,
      duration: trainingDetails.duration,
      certification: trainingDetails.certification,
      fullName: formData.fullName,
      role: formData.role,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      compFinName: formData.compFinName,
      compFinEmail: formData.compFinEmail,
      isPCD: formData.isPCD,
      pcdDescription: formData.pcdDescription,
      additionalParticipants: formData.additionalParticipants || []
    }

    console.log('[v0] confirmationData:', confirmationData)

    // Save data to context
    setConfirmationData(confirmationData)

    console.log('[v0] Navigating to /confirmation')
    // Redirect to confirmation page
    router.push('/confirmation')
  }

  const renderForm = () => {
    switch (level) {
      case 'essentials':
        return <EnrollFormEssentials formData={formData} onFormDataChange={setFormData} onSubmit={handleSubmit} />
      case 'foundations':
        return <EnrollFormFoundations formData={formData} onFormDataChange={setFormData} onSubmit={handleSubmit} />
      case 'expert':
        return <EnrollFormExpert formData={formData} onFormDataChange={setFormData} onSubmit={handleSubmit} />
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto no-scrollbar p-4 pt-10">
      <div className="w-full max-w-5xl bg-white rounded-lg mt-4">
        {/* Header */}
        <div className="p-8 pb-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-[#0D5B9C] hover:text-[#0D5B9C]/80 flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-normal">Voltar para trilha de treinamentos</span>
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {renderForm()}
        </div>
      </div>
    </div>
  )
}
