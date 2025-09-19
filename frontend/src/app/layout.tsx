import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/provider/ThemeProvider'
import TanstackProvider from '@/provider/TanstackProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Barangay Management System',
  description: 'A comprehensive management system for barangay administration.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <ThemeProvider defaultTheme="light" storageKey="barangay-theme">
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
