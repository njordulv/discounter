import { Outfit } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Discounts & Deals',
  description: 'Find the best discounts and promotions online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-col items-center min-h-[calc(100vh-7rem)] px-6 py-10 gap-6 justify-center relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
