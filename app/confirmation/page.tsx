'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Calendar, MapPin, Clock, Award, Mail, Phone, Building2, ArrowLeft, DownloadIcon } from 'lucide-react'
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
        try {
          const decodedData = JSON.parse(decodeURIComponent(dataParam))
          setConfirmationData(decodedData)
          setConfirmationNumber(generateConfirmationNumber())
        } catch (parseError) {
          console.error('Error parsing data:', parseError)
        }
      }
    } catch (error) {
      console.error('Error in confirmation page:', error)
    }
  }, [searchParams])

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <p className="text-gray-600">Carregando informações de confirmação...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] py-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Image src="/LogoRequestia.png" alt="Requestia" width={120} height={40} />
          <Button variant="outline" size="sm" className="gap-2">
            <HelpIcon className="w-4 h-4" />
            Dúvidas
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-[#0D5B9C]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscrição confirmada!</h1>
          <p className="text-gray-600">Receberemos sua solicitação de inscrição para o treinamento</p>
          
          {/* Confirmation Number */}
          <div className="mt-6 inline-block">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Solicitação:</span>
              <span className="font-mono font-bold text-[#0D5B9C]">{confirmationNumber}</span>
            </div>
          </div>
        </div>

        {/* Training Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <Badge className="bg-blue-500 hover:bg-blue-600">{confirmationData.levelNumber}</Badge>
            <h2 className="text-2xl font-bold text-gray-900">{confirmationData.levelName}</h2>
          </div>

          {/* Training Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Data</p>
                <p className="font-semibold text-gray-900">4 a 6 de maio de 2026</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Local</p>
                <p className="font-semibold text-gray-900">Campinas, SP</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Duração</p>
                <p className="font-semibold text-gray-900">3 dias intensivos</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Award className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Certificação</p>
                <p className="font-semibold text-gray-900">Requestia {confirmationData.levelName.split(' ')[1]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Participant Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Dados do participante</h3>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nome</p>
              <p className="font-semibold text-gray-900">{confirmationData.fullName}</p>
              <p className="text-sm text-gray-600">{confirmationData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Cargo</p>
              <p className="font-semibold text-gray-900">{confirmationData.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Empresa</p>
              <p className="font-semibold text-gray-900">{confirmationData.company}</p>
              {confirmationData.compFinName && (
                <>
                  <p className="text-sm text-gray-600 mt-2">Responsável Financeiro</p>
                  <p className="font-semibold text-gray-900">{confirmationData.compFinName}</p>
                  <p className="text-sm text-gray-600">{confirmationData.compFinEmail}</p>
                </>
              )}
            </div>
          </div>

          {/* Additional Participants */}
          {confirmationData.additionalParticipants && confirmationData.additionalParticipants.length > 0 && (
            <div className="border-t pt-6">
              <h4 className="font-bold text-gray-900 mb-4">Participantes Adicionais</h4>
              <div className="space-y-4">
                {confirmationData.additionalParticipants.map((participant, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0D5B9C]">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{participant.addName}</p>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                      <p className="text-sm text-gray-600">{participant.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Próximos passos</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-[#0D5B9C]">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Confirmação por e-mail</p>
                <p className="text-sm text-gray-600">Você receberá um e-mail de confirmação com todos os detalhes da inscrição.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-[#0D5B9C]">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Validação da equipe</p>
                <p className="text-sm text-gray-600">Nossa equipe de treinamento validará sua inscrição em até 2 dias úteis.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-[#0D5B9C]">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Instruções de preparação</p>
                <p className="text-sm text-gray-600">Após a validação, você receberá instruções detalhadas de preparação e acesso ao material do treinamento.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Reenviar confirmação por e-mail
            </Button>
            <Button className="flex-1 bg-[#0D5B9C] hover:bg-[#0A4575]">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Baixar comprovante (PDF)
            </Button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Precisa de ajuda?</h3>
          <p className="text-sm text-gray-600 mb-2">Entre em contato com nossa equipe de suporte em caso de dúvidas ou alterações necessárias.</p>
          <p className="text-sm font-semibold text-[#0D5B9C]">mkt@requestia.com</p>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#0D5B9C] hover:text-[#0A4575] font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Voltar para trilha de treinamentos
          </Link>
        </div>
      </div>
    </div>
  )
}

function HelpIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
