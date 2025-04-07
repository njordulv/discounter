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
      <body className={notoSans.variable}>
        <div className="flex flex-col relative overflow-hidden">
          <Decor />
          <Header />
          <main className="w-full max-w-5xl m-auto min-h-[calc(100vh-7.5rem)] sm:py-16 py-2 px-2 flex flex-col sm:gap-3 gap-2 relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
