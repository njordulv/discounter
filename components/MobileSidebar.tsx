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
import { Button } from '@/components/ui/Button'
import { Logo, SidebarMenu, CategoryMenu, Theme } from '@/components/ui/sidebar'

const MobileSidebar = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <TbMenu2
          size={30}
          className="absolute right-3 top-6 z-10 cursor-pointer text-[hsl(var(--background))]"
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Logo />
          </DrawerTitle>
          <DrawerDescription hidden>Menu Items</DrawerDescription>
          <SidebarMenu />
          <hr className="border-input my-2" />
          <CategoryMenu />
          <hr className="border-input mt-2" />
          <Theme />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button size="md" variant="outline" text="Close" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileSidebar
