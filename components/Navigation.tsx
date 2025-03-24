import Logo from '@/components/Logo'
import { SideMenu } from '@/components/ui/Menu'

export const Navigation = () => {
  return (
    <nav className="m-auto w-full max-w-5xl flex justify-between p-4 gap-9 relative">
      <Logo />
      <SideMenu />
    </nav>
  )
}
