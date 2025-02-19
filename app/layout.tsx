import { Raleway } from 'next/font/google'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const raleway = Raleway({
  variable: '--font-raleway',
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
      <body className={`${raleway.className}`}>
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-col items-center min-h-[calc(100vh-7rem)] px-6 gap-6 justify-center ">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
