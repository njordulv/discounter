'use client'

import { SlMenu } from 'react-icons/sl'
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
import { SidebarLink, Theme } from '@/components/ui/sidebar'
import { catsConfig } from '@/config/categories'
import config from '@/config'

export const MobileSidebar = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <SlMenu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>asd</DrawerDescription>
          <ul>
            {Object.values(config.mainMenu).map((item) => (
              <li key={item.slug}>
                <SidebarLink category={item} />
              </li>
            ))}
          </ul>
          <hr className="border-input my-2" />
          <ul>
            {Object.values(catsConfig).map((item) => (
              <li key={item.slug}>
                <SidebarLink category={item} />
              </li>
            ))}
          </ul>
          <hr className="border-input mt-2" />
          <Theme />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
