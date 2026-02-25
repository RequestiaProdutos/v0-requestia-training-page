'use client'

import { useEnrollment } from '@/contexts/enrollment-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Calendar, MapPin, Clock, Award, Mail, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
          certification: 'Requestia Foundations'
        }
      case 'expert':
        return {
          date: 'A confirmar',
          location: 'A confirmar',
          duration: '5 dias intensivos',
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/LogoRequestia.png" alt="Requestia" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Dúvidas
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-50 rounded-full">
              <Lock className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscrição confirmada!</h1>
          <p className="text-gray-600">Recebemos sua solicitação de inscrição para o treinamento</p>

          {/* Confirmation Number */}
          <div className="mt-6 inline-block bg-white border border-gray-200 rounded-lg px-6 py-3">
            <span className="text-gray-600 text-sm">Solicitação:</span>
            <span className="font-semibold text-gray-900 ml-2">{confirmationNumber}</span>
          </div>
        </div>

        {/* Training Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          {/* Level Badge */}
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            {confirmationData.levelNumber}
          </Badge>

          {/* Level Name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{confirmationData.levelName}</h2>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Data</span>
              </div>
              <p className="text-gray-900 font-semibold">{details.date}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Local</span>
              </div>
              <p className="text-gray-900 font-semibold">{details.location}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Duração</span>
              </div>
              <p className="text-gray-900 font-semibold">{details.duration}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Certificação</span>
              </div>
              <p className="text-gray-900 font-semibold">{details.certification}</p>
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
