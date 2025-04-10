import { TbMenu2 } from 'react-icons/tb'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Categories } from '@/components/emag/Categories'

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" icon={<TbMenu2 size={20} />} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Browse categories and products</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <Categories />
          <hr className="border-input" />
          <ThemeToggle />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" text="Close" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
