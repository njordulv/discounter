import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import ThemeProvider from '@/providers/theme'
import { Content } from '@/components/Content'
import Decor from '@/components/ui/Decor'
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
    <html lang="en" suppressHydrationWarning>
      <body className={notoSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Content>{children}</Content>
          <Decor />
        </ThemeProvider>
      </body>
    </html>
  )
}
