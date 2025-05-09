'use client'

import { TbMenu2 } from 'react-icons/tb'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui/Button'
import { SidebarMenu, CategoryMenu } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import Logo from '@/components/Logo'

const MobileSidebar = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    isMobile && (
      <Drawer>
        <DrawerTrigger>
          <TbMenu2
            size={30}
            className="absolute right-2 top-4 z-10 cursor-pointer text-[var(--secondary-foreground)]"
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <Logo />
            </DrawerTitle>
            <DrawerDescription hidden>Menu Items</DrawerDescription>
            <SidebarMenu />
            <hr className="border-input my-1" />
            <CategoryMenu />
            <hr className="border-input mt-1" />
            <ThemeToggle />
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button size="md" variant="outline" text="Close" />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  )
}

export default MobileSidebar
