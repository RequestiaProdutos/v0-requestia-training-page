'use client'

import { useEnrollment } from '@/contexts/enrollment-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LockKeyhole, Calendar, MapPin, Clock, Award, Mail, Download, ArrowLeft, ClockFading, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ContactModal } from '@/components/contact-modal'

function generateConfirmationNumber() {
  return `REQ-${Math.floor(Math.random() * 100000000)}`
}

export default function ConfirmationPage() {
  const { confirmationData } = useEnrollment()

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Nenhuma inscrição encontrada</h1>
          <p className="text-gray-600 mb-6">Por favor, preencha o formulário de inscrição para continuar.</p>
          <Link href="/">
            <Button className="bg-[#0D5B9C] hover:bg-[#0D5B9C]/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para trilha de treinamentos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const confirmationNumber = generateConfirmationNumber()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md shadow-[#004680]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <img
            src="/LogoRequestia.png"
            alt="Requestia Logo"
            width={140}
            height={44}
          />
          <ContactModal />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-6 bg-[#F4F7FA] rounded-full">
              <LockKeyhole className="w-10 h-10 text-[#0D5B9C]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscrição confirmada!</h1>
          <p className="text-gray-600">Recebemos sua solicitação de inscrição para o treinamento</p>

          {/* Confirmation Number */}
          <div className="mt-6 inline-block bg-[#f4f7fa] border border-[#DCDCDD] rounded-lg px-6 py-3">
            <span className="text-gray-600 text-sm">Solicitação:</span>
            <span className="font-semibold text-gray-900 ml-2">{confirmationNumber}</span>
          </div>
        </div>

        {/* Training Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          {/* Level Badge */}
          <Badge className="bg-gradient-to-b from-[#F2A57B] to-[#E97334] px-5 py-1 rounded-full mb-4">
            {confirmationData.levelNumber}
          </Badge>

          {/* Level Name */}
          <div className="mb-8 border-b pb-5">
            <h2 className="text-3xl font-medium text-[#00233f] mb-2">{confirmationData.levelName}</h2>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-7 h-7 text-gray-700" />
                <p className="text-sm text-[#5F7990] font-medium">Data</p>
              </div>
              <p className="text-base font-medium text-gray-800 ml-9">{confirmationData.date}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MapPin className="w-7 h-7 text-gray-700" />
                <p className="text-sm text-[#5F7990] font-medium">Local</p>
              </div>
              <p className="text-base font-medium text-gray-800 ml-9">{confirmationData.location}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <ClockFading className="w-7 h-7 text-gray-700" />
                <p className="text-sm text-[#5F7990] font-medium">Duração</p>
              </div>
              <p className="text-base font-medium text-gray-800 ml-9">{confirmationData.duration}</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Award className="w-7 h-7 text-gray-700" />
                <p className="text-sm text-[#5F7990] font-medium">Certificação</p>
              </div>
              <p className="text-base font-medium text-gray-800 ml-9">{confirmationData.certification}</p>
            </div>
          </div>

          {/* Participant Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Dados do participante</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <span className="text-sm text-gray-600">Nome</span>
                <p className="font-semibold text-gray-900">{confirmationData.fullName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Email</span>
                <p className="font-semibold text-gray-900 break-all">{confirmationData.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cargo</span>
                <p className="font-semibold text-gray-900">{confirmationData.role}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Empresa</span>
                <p className="font-semibold text-gray-900">{confirmationData.company}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Telefone</span>
                <p className="font-semibold text-gray-900">{confirmationData.phone}</p>
              </div>
              {confirmationData.compFinName && (
                <div>
                  <span className="text-sm text-gray-600">Responsável Financeiro</span>
                  <p className="font-semibold text-gray-900">{confirmationData.compFinName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Participants */}
          {confirmationData.additionalParticipants && confirmationData.additionalParticipants.length > 0 && (
            <div className="mb-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Participantes Adicionais</h3>
              <div className="space-y-4">
                {confirmationData.additionalParticipants.map((participant, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="font-semibold text-gray-700 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{participant.addName}</p>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                        <p className="text-sm text-gray-600">{participant.role}</p>
                        <p className="text-sm text-gray-600">{participant.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Próximos passos</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">1</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Confirmação por e-mail</h4>
                <p className="text-gray-600 text-sm">Você receberá um e-mail de confirmação com todos os detalhes da inscrição.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">2</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Validação da equipe</h4>
                <p className="text-gray-600 text-sm">Nossa equipe de treinamento validará sua inscrição em até 2 dias úteis.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">3</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Instruções de preparação</h4>
                <p className="text-gray-600 text-sm">Após a validação, você receberá instruções detalhadas de preparação e acesso ao material do treinamento.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button variant="outline" className="w-full" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Reenviar confirmação por e-mail
          </Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Baixar comprovante (PDF)
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Precisa de ajuda?</h3>
          <p className="text-gray-600 mb-4">Entre em contato com nossa equipe de suporte em caso de dúvidas ou alterações necessárias.</p>
          <p className="text-gray-900 font-semibold">mkt@requestia.com</p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              ← Voltar para trilha de treinamentos
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
