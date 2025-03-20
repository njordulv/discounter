import { LuMenu } from 'react-icons/lu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/Button'
import { Categories } from '@/components/emag/Categories'

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" icon={<LuMenu size={23} />} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <Categories />
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
