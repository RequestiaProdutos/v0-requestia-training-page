'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Calendar, MapPin, Clock, Award, Mail, Phone, Building2, UserCheck, ArrowLeft, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

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
  compFinName: string
  compFinEmail: string
  additionalParticipants: Array<{
    addName: string
    role: string
    email: string
    phone: string
  }>
}

function generateConfirmationNumber() {
  return `REQ-${Math.floor(Math.random() * 100000000)}`
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null)
  const [confirmationNumber, setConfirmationNumber] = useState('')

  useEffect(() => {
    try {
      const dataParam = searchParams.get('data')
      if (dataParam) {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        setConfirmationData(decodedData)
        setConfirmationNumber(generateConfirmationNumber())
      }
    } catch (error) {
      console.error('Error decoding confirmation data:', error)
    }
  }, [searchParams])

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <p className="text-gray-600">Carregando informações de confirmação...</p>
      </div>
    )
  }

  const levelColors: { [key: string]: string } = {
    'essentials': 'from-[#F2A57B] to-[#E97334]',
    'foundations': 'from-[#6F8EAA] to-[#B3C6D9]',
    'expert': 'from-[#E7B15C] to-[#DE9627]'
  }

  const getLevelDetails = () => {
    switch (confirmationData.level) {
      case 'essentials':
        return {
          date: 'Online',
          location: 'Online',
          duration: '5 horas',
          certification: 'Requestia Essentials'
        }
      case 'foundations':
        return {
          date: '4 a 6 de maio de 2026',
          location: 'Campinas, SP',
          duration: '3 dias intensivos',
          certification: 'Requestia Foundation'
        }
      case 'expert':
        return {
          date: '9 a 11 de novembro de 2026',
          location: 'Campinas, SP',
          duration: '3 dias intensivos',
          certification: 'Requestia Expert'
        }
      default:
        return {
          date: '',
          location: '',
          duration: '',
          certification: ''
        }
    }
  }

  const details = getLevelDetails()

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <img
            src="/LogoRequestia.png"
            alt="Requestia Logo"
            width={140}
            height={44}
          />
          <Button variant="outline" className="border-2 border-[#0D5B9C] text-[#0D5B9C]">
            Dúvidas
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#E3F2FD] flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#0D5B9C]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#00233f] mb-2">Inscrição confirmada!</h1>
          <p className="text-gray-600">Receberemos sua solicitação de inscrição para o treinamento</p>
        </div>

        {/* Confirmation Number */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EFF2FC] px-4 py-2 rounded-lg border border-[#0D5B9C]/20">
            <span className="text-sm text-[#5F7990] font-medium">Solicitação:</span>
            <span className="text-sm font-mono font-bold text-[#0D5B9C]">{confirmationNumber}</span>
          </div>
        </div>

        {/* Course Details Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          {/* Level Badge and Title */}
          <div className="mb-8 pb-8 border-b">
            <Badge className={`bg-gradient-to-b ${levelColors[confirmationData.level]} text-white border-0 px-3 py-1 rounded-full mb-4`}>
              {confirmationData.levelNumber}
            </Badge>
            <h2 className="text-3xl font-bold text-[#00233f] mb-2">{confirmationData.levelName}</h2>
          </div>

          {/* Course Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#5F7990]" />
                <span className="text-xs text-[#5F7990] font-medium">Data</span>
              </div>
              <span className="text-sm font-medium text-[#00233f]">{details.date}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#5F7990]" />
                <span className="text-xs text-[#5F7990] font-medium">Local</span>
              </div>
              <span className="text-sm font-medium text-[#00233f]">{details.location}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#5F7990]" />
                <span className="text-xs text-[#5F7990] font-medium">Duração</span>
              </div>
              <span className="text-sm font-medium text-[#00233f]">{details.duration}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#5F7990]" />
                <span className="text-xs text-[#5F7990] font-medium">Certificação</span>
              </div>
              <span className="text-sm font-medium text-[#00233f]">{details.certification}</span>
            </div>
          </div>

          {/* Participant Data */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#00233f] mb-6">Dados do participante</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-[#5F7990] font-medium mb-1">Allianza Gasparotto Namikawa</p>
                <p className="text-xs text-[#5F7990] mb-3">{confirmationData.email}</p>
                <p className="text-sm font-medium text-[#00233f] mb-1">{confirmationData.role}</p>
                <p className="text-xs text-[#5F7990]">{confirmationData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[#5F7990] font-medium mb-1">Necessidades Especiais (PCD)</p>
                <p className="text-sm font-medium text-[#00233f]">Não</p>
                <p className="text-xs text-[#5F7990] mt-3">Lorem ipsum dolor sit amet.</p>
              </div>
              <div>
                <p className="text-sm text-[#5F7990] font-medium mb-1">Empresa</p>
                <p className="text-sm font-medium text-[#00233f]">{confirmationData.company}</p>
                <p className="text-xs text-[#5F7990]">{confirmationData.compFinName}</p>
                <p className="text-xs text-[#5F7990]">{confirmationData.compFinEmail}</p>
              </div>
            </div>
          </div>

          {/* Additional Participants */}
          {confirmationData.additionalParticipants && confirmationData.additionalParticipants.length > 0 && (
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-lg font-bold text-[#00233f] mb-6">Participantes Adicionais</h3>
              <div className="space-y-6">
                {confirmationData.additionalParticipants.map((participant, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#DEEAF4] flex items-center justify-center text-sm font-bold text-[#0D5B9C]">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#00233f]">{participant.addName}</p>
                      <p className="text-xs text-[#5F7990]">{participant.email}</p>
                      <p className="text-sm text-[#5F7990] mt-1">{participant.role}</p>
                      <p className="text-xs text-[#5F7990]">{participant.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#00233f] mb-6">Próximos passos</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0D5B9C] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[#00233f]">Confirmação por e-mail</p>
                  <p className="text-sm text-[#5F7990] mt-1">Você receberá um e-mail de confirmação com todos os detalhes da inscrição.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0D5B9C] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-[#00233f]">Validação da equipe</p>
                  <p className="text-sm text-[#5F7990] mt-1">Nossa equipe de treinamento validará sua inscrição em até 2 dias úteis.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0D5B9C] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-[#00233f]">Instruções de preparação</p>
                  <p className="text-sm text-[#5F7990] mt-1">Após a validação, você receberá instruções detalhadas de preparação e acesso ao material do treinamento.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button variant="outline" className="border-2 border-[#0D5B9C] text-[#0D5B9C] h-12">
              <Mail className="w-4 h-4 mr-2" />
              Reenviar confirmação por e-mail
            </Button>
            <Button className="bg-[#0D5B9C] text-white hover:bg-[#0D5B9C]/90 h-12">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Baixar comprovante (PDF)
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-[#F9FAFB] rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-[#00233f] mb-2">Precisa de ajuda?</h4>
            <p className="text-sm text-[#5F7990] mb-2">Entre em contato com nossa equipe de suporte em caso de dúvidas ou alterações necessárias.</p>
            <p className="text-sm font-medium text-[#0D5B9C]">mkt@requestia.com</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#0D5B9C] hover:text-[#0D5B9C]/80 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Voltar para trilha de treinamentos
          </Link>
        </div>
      </main>
    </div>
  )
}
