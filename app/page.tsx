'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, GraduationCap, BookOpen, Clock, Gift, Award, CircleCheck, Info, MapPin, ClockFading, Lock, CalendarCheck, Quote } from 'lucide-react'
import { ContactModal } from '@/components/contact-modal'
import { EnrollModal } from '@/components/enroll-modal'

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState('essentials')
  const [enrollModalOpen, setEnrollModalOpen] = useState(false)

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
          <ContactModal />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF6F2_25%,#FFFFFF_50%,#F6FBFF_75%,#F4F7FA_100%)] pb-20 lg:pb-32">
        {/* Decorative dot pattern - left side */}
        <div className="absolute left-10 top-5 w-32 h-full pointer-events-none">
          <img
            src="/L_Dots.png"
            alt="Decorative dots pattern"
            width={67}
            height={317}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 pt-8">
              {/* Badge */}
              <div className="inline-flex">
                <Badge
                  variant="outline"
                  className="border-2 border-[#0d5b9c] text-[#0d5b9c] px-6 py-2 rounded-full font-medium text-base"
                >
                  Treinamentos
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-[#00233f] leading-tight">
                Trilha de Capacitação Requestia
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Desenvolva suas habilidades por meio de uma jornada estruturada de aprendizagem, com conteúdo prático e certificação oficial.
              </p>
            </div>

            {/* Right Image - Profile Circle */}
            <div className="relative h-80 sm:h-96 lg:h-96 flex items-center justify-center pt-8 lg:pt-0">
              {/* SVG Lines Container - Positioned absolutely */}
              <div className="absolute inset-0 pointer-events-none w-full h-full">
                {/* SVG 1 (principal horizontal lines) */}
                <svg
                  className="absolute"
                  style={{ left: '20px', top: '-40px' }}
                  width="540"
                  height="483"
                  viewBox="0 0 540 483"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M0.5 0V122C0.5 139.673 14.8269 154 32.5 154H507.5C525.173 154 539.5 168.327 539.5 186V362.5C539.5 380.173 525.173 394.5 507.5 394.5H178.312C160.638 394.5 146.312 408.827 146.312 426.5V483" stroke="#5F7990" strokeDasharray="6 6" strokeWidth="1.5" />
                </svg>

                {/* SVG 2 (lateral right lines) */}
                <svg
                  className="absolute"
                  style={{ right: '-140px', top: '-40px' }}
                  width="62"
                  height="455"
                  viewBox="0 0 62 455"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M61.5 454.5H32.5C14.8269 454.5 0.5 440.173 0.5 422.5V0.5" stroke="#5F7990" strokeLinecap="round" strokeDasharray="6 6" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Profile Circle - In front of SVG */}
              <div className="relative z-20 w-fit">
                {/* Imagem (âncora central) */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden shrink-0">
                    <img
                      src="https://freepngimg.com/download/food/139203-food-plate-top-nutrition-view.png"
                      alt="Professional profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Novo ícone à esquerda (fixo em relação à imagem) */}
                <div className="absolute z-20 top-1/2 right-full -translate-y-38 -translate-x-15">
                  <div className="w-4 h-4 sm:w-8 sm:h-8 lg:w-16 lg:h-16 rounded-full bg-[#DEEAF4] flex items-center justify-center">
                    <GraduationCap className="text-[#0D5B9C] w-8 h-8" />
                  </div>
                </div>

                {/* Ícone à direita (fixo em relação à imagem) */}
                <div className="absolute z-20 top-1/2 left-full -translate-y-18 translate-x-14">
                  <div className="w-4 h-4 sm:w-8 sm:h-8 lg:w-16 lg:h-16 rounded-full bg-[#DEEAF4] flex items-center justify-center">
                    <Brain className="text-[#0D5B9C] w-7 h-7" />
                  </div>
                </div>

                {/* Novo ícone ao meio (fixo em relação à imagem) */}
                <div className="absolute z-20 top-1/2 right-full translate-y-43 translate-x-14">
                  <div className="w-4 h-4 sm:w-8 sm:h-8 lg:w-8 lg:h-8 rounded-full bg-[#DEEAF4] flex items-center justify-center">
                    <BookOpen className="text-[#0D5B9C] w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Training Levels Section */}
      <section className="relative overflow-hidden bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#00233f] mb-4">
              Níveis de treinamento
            </h2>
            <p className="text-2xl font-regular text-[#5F7990]">
              Escolha o nível adequado ao seu momento e avanço na trilha de capacitação.
            </p>
          </div>

          {/* Level buttons */}
          <div className="flex justify-center mb-12">
            <div className="relative flex items-center bg-[#E3EDF5] p-5 rounded-full">

              {[
                { id: 'essentials', label: 'Essentials' },
                { id: 'foundations', label: 'Foundations' },
                { id: 'expert', label: 'Expert' }
              ].map((level, index, arr) => (
                <div key={level.id} className="relative flex items-center">

                  <button
                    onClick={() => setSelectedLevel(level.id)}
                    className={`relative z-10 px-5 py-2 rounded-full text-base sm:text-xl font-regular transition-all
            ${selectedLevel === level.id
                        ? 'bg-[#0D5B9C] text-white'
                        : 'bg-[#CBDDEF] text-white/70 hover:bg-[#ACC8E4]'
                      }`}
                  >
                    {level.label}
                  </button>

                  {/* Conector */}
                  {index < arr.length - 1 && (
                    <div className="relative flex items-center justify-center w-12">
                      <div className="absolute w-full h-[2px] bg-[#CBDDEF]" />
                      <div className={`relative z-10 w-4 h-4 rounded-full ${selectedLevel === level.id
                        ? 'bg-[#0D5B9C]'
                        : 'bg-[#CBDDEF]'
                        }`} />
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Card Section */}
      <section className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-16 pb-4 rounded-2xl">
        {/* Level indicator */}
        <div className="flex items-start gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#003765] to-[#206EB0] text-white flex items-center justify-center text-xl font-regular shrink-0">
            {selectedLevel === 'essentials' ? '1' : selectedLevel === 'foundations' ? '2' : '3'}
          </div>
          <div>
            <h3 className="text-2xl font-regular text-[#00233f]">
              {selectedLevel === 'essentials' ? 'Requestia Essentials' : selectedLevel === 'foundations' ? 'Requestia Foundations' : 'Requestia Expert'}
            </h3>
            <p className="text-lg font-regular text-[#5F7990]">
              {selectedLevel === 'essentials'
                ? 'Conheça os conceitos fundamentais para administrar a plataforma Requestia.'
                : selectedLevel === 'foundations'
                  ? 'Administre a plataforma no dia a dia com um treinamento prático.'
                  : 'Domine funcionalidades avançadas e otimize a plataforma.'}
            </p>
          </div>
        </div>

        {/* Upcoming classes */}
        <div className="mb-8">
          <h4 className="text-lg font-regular text-[#5F7990] mb-6 pb-4 border-b border-gray-200">
            Próximas turmas
          </h4>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedLevel === 'essentials' && (
              <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden p-6 shadow-lg shadow-gray-100">
                {/* Course badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-[#F6F4F8] text-purple-700 border-0 px-3 py-2 rounded-full justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Online
                  </Badge>
                  <Badge className="bg-[#FFF3F7] text-red-700 border-0 px-3 py-2 rounded-full justify-center">
                    <Gift className="h-4 w-4 mr-1" />
                    Gratuito
                  </Badge>
                  <Badge className="bg-[#EFF2FC] text-blue-700 border-0 px-3 py-2 rounded-full justify-center">
                    <Award className="h-4 w-4 mr-1" />
                    Certificado
                  </Badge>
                </div>

                {/* Course title */}
                <h5 className="text-xl font-semibold text-[#00233f] mb-4">
                  Introdução à Plataforma Requestia
                </h5>

                {/* Learning objectives */}
                <div className="space-y-3 mb-8">
                  {[
                    'Navegue pela plataforma e entenda sua estrutura',
                    'Realize as configurações iniciais de administração',
                    'Realize as configurações iniciais de administração'
                  ].map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CircleCheck className="w-5 h-5 text-[#0d5b9c] shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{objective}</span>
                    </div>
                  ))}
                </div>

                {/* Enroll button */}
                <Button onClick={() => setEnrollModalOpen(true)} className="w-full px-6 py-2 bg-white border-2 border-[#e35205] text-[#e35205] hover:bg-[#e35205]/5 font-regular">
                  Inscrever-se
                </Button>
              </div>
            )}

            {selectedLevel === 'foundations' && (
              <>
                {/* Foundation Course Card 1 */}
                <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden p-6">

                  {/* Date section */}
                  <div className="mb-6 p-4 bg-[#E9EEF2] rounded-lg flex items-center gap-3">
                    <CalendarCheck className="w-5 h-5 text-gray-700" />
                    <div className="flex-1">
                      <p className="font-regular text-gray-600"> <b>4 a 6 de maio</b> | Segunda a quarta-feira</p>
                    </div>
                    <button>
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Course description */}
                  <p className="text-gray-600 text-sm mb-6">
                    Crie e edite processos, configure fluxos e formulários e evolua processos com mais autonomia no dia a dia da administração da plataforma.
                  </p>

                  {/* Course info items */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">Campinas, SP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockFading className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">3 dias intensivos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">Certificado oficial</span>
                    </div>
                  </div>

                  {/* Enroll button */}
                  <Button onClick={() => setEnrollModalOpen(true)} className="w-full px-6 py-3 bg-white border-2 border-[#e35205] text-[#e35205] hover:bg-[#e35205]/5 font-semibold text-base">
                    Inscrever-se
                  </Button>
                </div>

                {/* Foundation Course Card 2 */}
                <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden p-6">

                  {/* Date section */}
                  <div className="mb-6 p-4 bg-[#E9EEF2] rounded-lg flex items-center gap-3">
                    <CalendarCheck className="w-5 h-5 text-gray-700" />
                    <div className="flex-1">
                      <p className="font-regular text-gray-600"> <b>14 a 16 de maio</b> | Segunda a quarta-feira</p>
                    </div>
                    <button>
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Course description */}
                  <p className="text-gray-600 text-sm mb-6">
                    Crie e edite processos, configure fluxos e formulários e evolua processos com mais autonomia no dia a dia da administração da plataforma.
                  </p>

                  {/* Course info items */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">Campinas, SP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockFading className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">3 dias intensivos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-gray-700" />
                      <span className="text-sm text-gray-700">Certificado oficial</span>
                    </div>
                  </div>

                  {/* Enroll button */}
                  <Button onClick={() => setEnrollModalOpen(true)} className="w-full px-6 py-3 bg-white border-2 border-[#e35205] text-[#e35205] hover:bg-[#e35205]/5 font-semibold text-base">
                    Inscrever-se
                  </Button>
                </div>
              </>
            )}

            {selectedLevel === 'expert' && (
              <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden p-6">

                {/* Date section */}
                <div className="mb-6 p-4 bg-[#E9EEF2] rounded-lg flex items-center gap-3">
                  <CalendarCheck className="w-5 h-5 text-gray-700" />
                  <div className="flex-1">
                    <p className="font-regular text-gray-600"> <b>9 a 11 de novembro</b> | Segunda a quarta-feira</p>
                  </div>
                  <button>
                    <Info className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Course description */}
                <p className="text-gray-600 text-sm mb-6">
                  Trabalhe com integrações, automações e recursos técnicos avançados para lidar com cenários mais complexos de uso da plataforma.
                </p>

                {/* Course info items */}
                <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <span className="text-sm text-gray-700">Campinas, SP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockFading className="w-5 h-5 text-gray-700" />
                    <span className="text-sm text-gray-700">3 dias intensivos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-700" />
                    <span className="text-sm text-gray-700">Certificado oficial</span>
                  </div>
                </div>

                {/* Enroll button */}
                <Button onClick={() => setEnrollModalOpen(true)} className="w-full px-6 py-3 bg-white border-2 border-[#e35205] text-[#e35205] hover:bg-[#e35205]/5 font-semibold text-base">
                  Inscrever-se
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-[#F2F6FA] border border-[#5F7990]/40 px-10 py-10">

          {/* Quote Icon */}
          <Quote className="w-10 h-10 text-[#0D5B9C] mb-6" />

          {/* Testimonial text */}
          <p className="text-[#3F556B] text-base leading-relaxed italic mb-8 max-w-4xl">
            “O treinamento é fundamental para quem utiliza a plataforma, pois amplia a compreensão sobre suas possibilidades e mostra até onde é possível evoluir com a tecnologia. Conteúdo produtivo, com temas relevantes e aplicáveis ao dia a dia.”
          </p>

          {/* Divider */}
          <div className="border-t border-[#5F7990]/30 mb-6" />

          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0D5B9C] text-white flex items-center justify-center font-semibold text-base">
              MP
            </div>

            <div>
              <p className="text-[#1F2D3D] font-semibold">
                Mario Henrique Pingnate
              </p>
              <p className="text-[#0D5B9C] text-sm">
                Banco Rendimento
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* Footer spacing */}
      <div className="h-16"></div>

      {/* Enroll Modal */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        level={selectedLevel as 'essentials' | 'foundations' | 'expert'}
      />
    </div>
  )
}
