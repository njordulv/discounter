import Logo from '@/components/Logo'
import { SideMenu } from '@/components/ui/Menu'

export const Navigation = () => {
  return (
    <nav className="p-4">
      <div className="m-auto w-full max-w-4xl flex justify-between gap-9 relative">
        <Logo />
        <SideMenu />
      </div>
    </nav>
  )
}
