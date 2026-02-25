'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Monitor, Award, CheckCircle2, ClockFading, CalendarCheck, MapPin, MonitorPlay, LoaderCircle } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
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
    switch (level) {
      case 'essentials':
        return {
          levelBadge: 'Nível 1',
          levelColor: 'bg-gradient-to-b from-[#F2A57B] to-[#E97334]',
          title: 'Inscreva-se no Requestia Essentials',
          description: 'Conheça os conceitos fundamentais da administração e as principais funcionalidades da plataforma.',
          tInfo1: 'Plataforma',
          rInfo1: 'Requestia LMS',
          tInfo2: 'Acesso',
          access: 'Online e gratuito',
          tInfo3: 'Horas de curso',
          hours: '5 horas',
          certification: 'Requestia Essentials',
          targetAudience: 'Usuários que irão administrar a Plataforma Requestia ou que precisam entender seu funcionamento básico.',
          mainBenefit: 'Compreenda a estrutura da plataforma, realize configurações iniciais com mais segurança e prepare-se para avançar na trilha de capacitação.',
          prerequisite: 'Não há pré-requisitos para este treinamento.',
          content: [
            'Visão geral da plataforma Requestia',
            'Navegação e estrutura da solução',
            'Principais funcionalidades',
            'Configurações iniciais de administração',
            'Noções básicas de usuários e permissões'
          ]
        }
      case 'foundations':
        return {
          levelBadge: 'Nível 2',
          levelColor: 'bg-gradient-to-b from-[#6F8EAA] to-[#B3C6D9]',
          title: 'Inscreva-se no Requestia Foundations',
          description: 'Administre a plataforma no dia a dia com um treinamento prático.',
          tInfo1: 'Data',
          rInfo1: '4 a 6 de maio de 2026',
          tInfo2: 'Local',
          access: 'Campinas-SP',
          tInfo3: 'Duração',
          hours: '3 dias intensivos',
          certification: 'Requestia Foundation',
          targetAudience: 'Profissionais que precisam administrar a plataforma no dia a dia, com mais autonomia e segurança.',
          mainBenefit: 'Evolua processos existentes e ganhe mais segurança para sustentar e expandir o uso da Requestia na operação.',
          prerequisite: 'Conclusão do Requestia Essentials ou conhecimento equivalente.',
          content: [
            'Criação e edição de processos',
            'Configuração de fluxos e formulários',
            'Categorização e modelos de solicitações',
            'Adaptação de processos à realidade da empresa',
          ]
        }
      default:
        return {
          levelBadge: 'Nível 3',
          levelColor: 'bg-gradient-to-b from-[#E7B15C] to-[#DE9627]',
          title: 'Inscreva-se no Requestia Expert',
          description: 'Domine funcionalidades avançadas e otimize a plataforma.',
          tInfo1: 'Data',
          rInfo1: '9 a 11 de novembro de 2026',
          tInfo2: 'Local',
          access: 'Campinas-SP',
          tInfo3: 'Duração',
          hours: '3 dias intensivos',
          certification: 'Requestia Expert',
          targetAudience: 'Profissionais que precisam atuar com recursos avançados da plataforma em cenários mais complexos.',
          mainBenefit: 'Atue com mais autonomia em cenários técnicos avançados, amplie as possibilidades de uso e fortaleça a evolução dos processos da empresa.',
          prerequisite: 'Conclusão do Requestia Foundation.',
          content: [
            'Integrações internas e externas',
            'Automações e fluxos avançados',
            'Uso de recursos técnicos em formulários',
            'Cenários complexos de administração'
          ]
        }
    }
  }

  const data = getLevelData()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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

    // Simulate 2 second loading
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Redirect to confirmation page with data
    const encodedData = encodeURIComponent(JSON.stringify(confirmationData))
    router.push(`/confirmation?data=${encodedData}`)
    
    setIsLoading(false)
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
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center justify-center">
            <LoaderCircle className="w-16 h-16 text-[#0D5B9C] animate-spin" />
          </div>
        </div>
      )}
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
                  {level === 'essentials' ? (
                    <MonitorPlay className="w-5 h-5 text-gray-700" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gray-700" />
                  )}
                  <p className="text-xs text-[#5F7990] font-normal">{data.tInfo2}</p>
                </div>
                <p className="text-sm font-medium text-gray-800 ml-7">{data.access}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <ClockFading className="w-5 h-5 text-gray-700" />
                  <p className="text-xs text-[#5F7990] font-normal">{data.tInfo3}</p>
                </div>
                <p className="text-sm font-medium text-gray-800 ml-7">{data.hours}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gray-700" />
                  <p className="text-xs text-[#5F7990] font-normal">Certificação</p>
                </div>
                <p className="text-sm font-medium text-gray-800 ml-7">{data.certification}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-5 items-start">
            {/* Left Column - About Training and Investment */}
            <div className="space-y-6">
              <div className="border p-4 rounded-md">
                <h3 className="text-base font-semibold text-[#003765] border-b pb-3 mb-6">Sobre este treinamento</h3>

                {/* For Whom */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-[#5F7990] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#5F7990]">Para quem é:</p>
                      <p className="text-xs text-[#5F7990] mt-1">{data.targetAudience}</p>
                    </div>
                  </div>
                </div>

                {/* Main Benefit */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-[#5F7990] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#5F7990]">Benefício principal:</p>
                      <p className="text-xs text-[#5F7990] mt-1">{data.mainBenefit}</p>
                    </div>
                  </div>
                </div>

                {/* Prerequisite */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-[#5F7990] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#5F7990]">Pré-requisito:</p>
                      <p className="text-xs text-[#5F7990] mt-1">{data.prerequisite}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5F7990] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-[#5F7990] mb-2">Conteúdo</p>
                      <ul className="space-y-1">
                        {data.content.map((item, index) => (
                          <li key={index} className="text-xs text-[#5F7990]">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Box - Only for Foundations and Expert */}
              {(level === 'foundations' || level === 'expert') && (
                <div className="p-4 rounded-md">
                  <h3 className="text-base font-semibold text-[#003765] mb-4 border-b pb-4">Investimento</h3>
                  <div className="space-y-2">
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
              )}
            </div>

            {/* Right Column - Render Form based on level */}
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
