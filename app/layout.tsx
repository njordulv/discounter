import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Decor from '@/components/ui/Decor'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
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
      <body className={notoSans.className}>
        <div className="flex flex-col relative overflow-hidden">
          <Decor />
          <Header />
          <main className="flex flex-col items-center min-h-[calc(100vh-7rem)] sm:px-6 sm:py-20 px-2 py-5 gap-8 justify-center relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
