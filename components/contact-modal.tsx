'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, MessageSquareWarning } from 'lucide-react'

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setIsOpen(false)
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  const handleCancel = () => {
    setIsOpen(false)
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <>
      {/* Contact Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2 text-[#004680] border-[#004680] hover:bg-[#004680]/5"
      >
        <MessageSquareWarning />
        Dúvidas
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 min-h-screen">
          {/* Modal */}
          <div className="bg-white rounded-3xl shadow-2xl w-[500px] h-[450px] p-8 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-6 right-6 p-1 hover:bg-gray-100 rounded-full transition"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Entre em contato
            </h2>

            {/* Description */}
            <p className="text-sm text-[#5F7990] mb-4 shrink-0">
              Tem dúvidas sobre o treinamento? Envie sua mensagem e nossa equipe retornará em breve.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 w-full flex flex-col flex-1">
              {/* Full Name Input */}
              <input
                type="text"
                name="name"
                placeholder="Nome Completo *"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
              />

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                placeholder="Telefone *"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition"
              />

              {/* Message Textarea */}
              <textarea
                name="message"
                placeholder="Mensagem *"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#206EB0] focus:border-transparent transition resize-none flex-1 min-h-0"
              />

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-2 shrink-0">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="px-6 py-2 border-2 border-[#206EB0] text-[#206EB0] hover:bg-[#206EB0]/5 font-semibold rounded-lg text-sm"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-[#206EB0] text-white hover:bg-[#1a5a8f] font-semibold rounded-lg text-sm"
                >
                  Enviar mensagem
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
