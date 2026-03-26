import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Junior JJ - Dev Portfolio',
  description: 'Desenvolvedor web criando experiências digitais modernas com React e Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
