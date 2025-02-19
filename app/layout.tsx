import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Discounts and coupons',
  description: 'Find the best discounts and promotions online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-col items-center min-h-[calc(100vh-7rem)] px-6 gap-6 justify-center font-[family-name:var(--font-geist-sans)]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
