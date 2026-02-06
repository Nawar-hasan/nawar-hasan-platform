import React from "react"
import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/language-context'

export const metadata: Metadata = {
  title: 'NAWAR HASAN PRO - Professional Tech Recruitment Platform',
  description: 'منصة احترافية تربط المهندسين بأفضل الفرص | Professional platform connecting engineers with the best opportunities',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
