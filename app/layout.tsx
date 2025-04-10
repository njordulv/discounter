import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import Decor from '@/components/ui/Decor'
import ThemeProvider from '@/providers/theme'
import { SideMenu } from '@/components/ui/SideMenu'
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
          <Decor />
          <SideMenu>{children}</SideMenu>
        </ThemeProvider>
      </body>
    </html>
  )
}
