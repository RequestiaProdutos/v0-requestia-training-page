"use client";

import { useEnrollment } from "@/contexts/enrollment-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LockKeyhole,
  MapPin,
  Award,
  ArrowLeft,
  ClockFading,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { ContactModal } from "@/components/contact-modal";

export default function ConfirmationPage() {
  const { confirmationData } = useEnrollment();

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Nenhuma inscrição encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            Por favor, preencha o formulário de inscrição para continuar.
          </p>
          <Link href="/">
            <Button className="bg-[#0D5B9C] hover:bg-[#0D5B9C]/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para trilha de treinamentos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-[#212121] mb-2">
            Inscrição confirmada!
          </h1>
          <p className="text-xl text-[#787979]">
            Recebemos sua solicitação de inscrição para o treinamento
          </p>
        </div>

        {/* Training Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          {/* Level Badge */}
          <Badge className="bg-gradient-to-b from-[#F2A57B] to-[#E97334] px-5 py-1 rounded-full mb-4">
            {confirmationData.levelNumber}
          </Badge>

          {/* Level Name */}
          <div className="mb-8 border-b pb-5">
            <h2 className="text-4xl font-medium text-[#212121] mb-2">
              {confirmationData.levelName}
            </h2>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8 mb-8 pb-8 border-b border-gray-200">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-7 h-7 text-[#212121]" />
                <p className="text-sm text-[#5F7990]">Data</p>
              </div>
              <p className="text-base text-[#212121] ml-9">
                {confirmationData.date}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MapPin className="w-7 h-7 text-[#212121]" />
                <p className="text-sm text-[#5F7990]">Local</p>
              </div>
              <p className="text-base text-[#212121] ml-9">
                {confirmationData.location}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <ClockFading className="w-7 h-7 text-[#212121]" />
                <p className="text-sm text-[#5F7990]">Duração</p>
              </div>
              <p className="text-base text-[#212121] ml-9">
                {confirmationData.duration}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Award className="w-7 h-7 text-[#212121]" />
                <p className="text-sm text-[#5F7990]">Certificação</p>
              </div>
              <p className="text-base text-[#212121] ml-9">
                {confirmationData.certification}
              </p>
            </div>
          </div>

          {/* Participant Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#212121] mb-4">
              Dados do participante
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
              {/* Column 1 - Personal Info */}
              <div className="space-y-1">
                <p className="text-sm text-[#212121]">
                  {confirmationData.fullName}
                </p>
                <p className="text-xs text-gray-600 break-all">
                  {confirmationData.email}
                </p>
                <p className="text-xs text-gray-600">{confirmationData.role}</p>
                <p className="text-xs text-gray-600">
                  {confirmationData.phone}
                </p>
              </div>

              {/* Column 2 - PCD */}
              <div className="space-y-1">
                {confirmationData.level !== "essentials" && (
                  <>
                    <p className="text-sm text-[#212121]">
                      Necessidades Especiais (PCD)
                    </p>
                    <p className="text-xs text-[#787979]">
                      {confirmationData.isPCD === null ||
                      confirmationData.isPCD === undefined
                        ? "—"
                        : confirmationData.isPCD
                          ? "Sim"
                          : "Não"}
                    </p>
                    {confirmationData.pcdDescription && (
                      <p className="text-xs text-[#787979]">
                        {confirmationData.pcdDescription}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Column 3 - Company */}
              <div className="space-y-1">
                <p className="text-sm text-[#212121]">Empresa</p>
                <p className="text-xs text-[#787979]">
                  {confirmationData.company}
                </p>
                {confirmationData.compFinName && (
                  <>
                    <p className="text-xs text-[#787979]">
                      {confirmationData.compFinName}
                    </p>
                    {confirmationData.compFinEmail && (
                      <p className="text-xs text-[#787979]">
                        {confirmationData.compFinEmail}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Additional Participants */}
          {confirmationData.additionalParticipants &&
            confirmationData.additionalParticipants.length > 0 && (
              <div className="mb-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-[#212121] mb-4">
                  Participantes Adicionais
                </h3>
                <div className="space-y-6">
                  {confirmationData.additionalParticipants.map(
                    (participant, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="text-sm text-[#00233F] bg-[#E3EDF5] rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-[#212121]">
                            {participant.addName}
                          </p>
                          <p className="text-xs text-[#787979]">
                            {participant.email}
                          </p>
                          <p className="text-xs text-[#787979]">
                            {participant.role}
                          </p>
                          <p className="text-xs text-[#787979]">
                            {participant.phone}
                          </p>
                          <p className="text-xs text-[#787979]">
                            Necessidades Especiais (PCD):{" "}
                            {participant.isPCD === null ||
                            participant.isPCD === undefined
                              ? "—"
                              : participant.isPCD
                                ? "Sim"
                                : "Não"}
                          </p>
                          {participant.isPCD && participant.pcdDescription && (
                            <p className="text-xs text-[#787979]">
                              Descrição: {participant.pcdDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-[#212121] mb-4">
            Próximos passos
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E3EDF5] text-[#00233F] text-sm">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-[#212121] text-lg">
                  Confirmação por e-mail
                </h4>
                <p className="text-[#787979] text-sm">
                  Você receberá um e-mail de confirmação com todos os detalhes
                  da inscrição.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E3EDF5] text-[#00233F] text-sm">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-[#212121] text-lg">Validação da equipe</h4>
                <p className="text-[#787979] text-sm">
                  Nossa equipe de treinamento validará sua inscrição em até 2
                  dias úteis.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#E3EDF5] text-[#00233F] text-sm">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-[#212121] text-lg">
                  Instruções de preparação
                </h4>
                <p className="text-[#787979] text-sm">
                  Após a validação, você receberá instruções detalhadas de
                  preparação e acesso ao material do treinamento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-2">
          <h3 className="text-lg text-[#212121] mb-3">Precisa de ajuda?</h3>
          <p className="text-[#787979] mb-4">
            Entre em contato com nossa equipe de suporte em caso de dúvidas ou
            alterações necessárias.
          </p>
          <p className="text-[#212121]">mkt@requestia.com</p>
        </div>
      </main>
    </div>
  );
}
