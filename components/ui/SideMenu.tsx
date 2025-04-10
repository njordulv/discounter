'use client'

import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import {
  FaChevronLeft,
  FaChevronRight,
  FaSafari,
  FaUser,
} from 'react-icons/fa6'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const SideMenu = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: 'Dashboard',
      href: '#',
      icon: (
        <FaChevronLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Profile',
      href: '#',
      icon: (
        <FaChevronRight className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Settings',
      href: '#',
      icon: (
        <FaSafari className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <FaUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full flex-1 flex-col rounded-md md:flex-row gap-2',
        'h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="h-screen fixed top-0 left-0 justify-between gap-10 border border-input rounded-md bg-card">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
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
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-md bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 border border-input rounded-md bg-card" />
    </Link>
  )
}
