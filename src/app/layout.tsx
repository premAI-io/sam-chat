import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sam Chat - Powered by PremAI',
  description: 'Chat with fine-tuned AI models using PremAI Studio',
  keywords: ['Sam Chat', 'PremAI', 'AI', 'chat', 'fine-tuning', 'machine learning'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-gradient-to-b from-gray-50 via-white to-white text-gray-900">{children}</body>
    </html>
  )
}
