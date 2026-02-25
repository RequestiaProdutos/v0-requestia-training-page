'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Monitor, Award, CheckCircle2, ClockFading, CalendarCheck, MapPin, MonitorPlay } from 'lucide-react'
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
  additionalParticipants?: Array<{
    addName: string
    role: string
    email: string
    phone: string
  }>
}

export function EnrollModal({ isOpen, onClose, level }: EnrollModalProps) {
  const router = useRouter()
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
    additionalParticipants: []
  })

  const getLevelData = () => {
    const levelConfigs: Record<string, any> = {
      essentials: {
        title: 'Requestia Essentials',
        description: 'Conheça as funcionalidades e diferenciais da Requestia',
        levelBadge: 'Nível 1',
        levelColor: 'from-[#F2A57B] to-[#E97334] bg-gradient-to-r',
        tInfo1: 'Formato',
        rInfo1: 'Online',
        tInfo2: 'Local',
        rInfo2: 'Campinas, SP',
        tInfo3: 'Duração',
        rInfo3: '2 horas',
        tInfo4: 'Certificado',
        rInfo4: 'Requestia Essentials',
      },
      foundations: {
        title: 'Requestia Foundations',
        description: 'Aprofunde seus conhecimentos em soluções específicas',
        levelBadge: 'Nível 2',
        levelColor: 'from-[#6F8EAA] to-[#B3C6D9] bg-gradient-to-r',
        tInfo1: 'Data',
        rInfo1: '4 a 6 de maio de 2026',
        tInfo2: 'Local',
        rInfo2: 'Campinas, SP',
        tInfo3: 'Duração',
        rInfo3: '3 dias intensivos',
        tInfo4: 'Certificado',
        rInfo4: 'Requestia Foundations',
      },
      expert: {
        title: 'Requestia Expert',
        description: 'Treinamento avançado com mentoria especializada',
        levelBadge: 'Nível 3',
        levelColor: 'from-[#E7B15C] to-[#DE9627] bg-gradient-to-r',
        tInfo1: 'Data',
        rInfo1: 'Sob consulta',
        tInfo2: 'Local',
        rInfo2: 'Campinas, SP',
        tInfo3: 'Duração',
        rInfo3: '5 dias intensivos',
        tInfo4: 'Certificado',
        rInfo4: 'Requestia Expert',
      }
    }
    return levelConfigs[level]
  }

  const data = getLevelData()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare confirmation data
    const confirmationData = {
      level: level,
      levelNumber: level === 'essentials' ? 'Nível 1' : level === 'foundations' ? 'Nível 2' : 'Nível 3',
      levelName: level === 'essentials' ? 'Requestia Essentials' : level === 'foundations' ? 'Requestia Foundations' : 'Requestia Expert',
      levelColor: level === 'essentials' ? 'from-[#F2A57B] to-[#E97334]' : level === 'foundations' ? 'from-[#6F8EAA] to-[#B3C6D9]' : 'from-[#E7B15C] to-[#DE9627]',
      fullName: formData.fullName,
      role: formData.role,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      compFinName: formData.compFinName,
      compFinEmail: formData.compFinEmail,
      additionalParticipants: formData.additionalParticipants || []
    }

    // Redirect to confirmation page with data
    const encodedData = encodeURIComponent(JSON.stringify(confirmationData))
    router.push(`/confirmation?data=${encodedData}`)
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
        return <EnrollFormEssentials formData={formData} onFormDataChange={setFormData} onSubmit={handleSubmit} />
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

        {/* Content */}
        <div className="p-6">
          {/* Title Section */}
          <div className="border p-4 rounded-md">
            <div className="mb-8 border-b pb-5">
              <Badge className={`${data.levelColor} text-white border-0 px-3 py-1 rounded-full mb-4`}>
                {data.levelBadge}
              </Badge>
              <h2 className="text-2xl font-semibold text-[#00233f] mb-2">{data.title}</h2>
              <p className="text-sm font-regular text-[#5F7990]">{data.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {level === 'essentials' ? (
                    <Monitor className="w-5 h-5 text-gray-700" />
                  ) : (
                    <CalendarCheck className="w-5 h-5 text-gray-700" />
                  )}
                  <span className="text-xs text-[#5F7990] font-normal">{data.tInfo1}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 ml-7">{data.rInfo1}</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span className="text-xs text-[#5F7990] font-normal">{data.tInfo2}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 ml-7">{data.rInfo2}</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <ClockFading className="w-5 h-5 text-gray-700" />
                  <span className="text-xs text-[#5F7990] font-normal">{data.tInfo3}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 ml-7">{data.rInfo3}</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gray-700" />
                  <span className="text-xs text-[#5F7990] font-normal">{data.tInfo4}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 ml-7">{data.rInfo4}</span>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Left Column - Pricing */}
            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4 text-[#00233f]">Valores de inscrição</h3>
              <div className="space-y-3">
                <div className="text-sm text-[#5F7990]">
                  <span className="font-normal">1 pessoa:</span> R$ 500,00
                </div>
                <div className="text-sm text-[#5F7990]">
                  <span className="font-normal">2 pessoas:</span> R$ 800,00
                </div>
                <div className="text-sm text-[#5F7990]">
                  <span className="font-normal">3 pessoas:</span> R$ 1.000,00
                </div>
              </div>
            </div>

            {/* Right Column - Render Form based on level */}
            <div>
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
