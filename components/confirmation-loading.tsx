'use client'

import { LoaderCircle } from 'lucide-react'

export function ConfirmationLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle className="w-16 h-16 text-[#0D5B9C] animate-spin" />
      </div>
    </div>
  )
}
