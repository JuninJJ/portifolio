'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5511995842626"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300 z-40"
      aria-label="Fale comigo no WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  )
}
