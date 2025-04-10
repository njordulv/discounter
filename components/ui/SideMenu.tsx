'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { catsConfig } from '@/config/categories'
import { ThemeToggle } from '@/components/ThemeToggle'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SVGIcon from '@/components/ui/SVGIcon'

export const SideMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full flex-1 flex-col md:flex-row gap-2',
        'h-screen'
      )}
    >
      <Sidebar>
        <SidebarBody className="h-screen fixed top-0 left-0 justify-between gap-10 border border-input rounded-tr-md rounded-br-md bg-card">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-1">
              {Object.values(catsConfig).map((cat) => (
                <SidebarLink key={cat.slug} category={cat} />
              ))}
              <hr className="border-input my-2" />
              <Theme />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full mx-auto">
        <Header />
        <main className="w-full max-w-5xl mx-auto min-h-[calc(100vh-7.5rem)] sm:py-16 py-2 px-2 flex flex-col sm:gap-3 gap-2 relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-secondary-foreground"
      >
        <SVGIcon width={162} height={32} />
      </motion.span>
    </Link>
  )
}

export const Theme = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-w-fit flex items-center gap-2 text-secondary-foreground"
    >
      <ThemeToggle />
    </motion.div>
  )
}
