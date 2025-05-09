import Logo from '@/components/Logo'
import Search from '@/components/Search'

export const Navigation = () => {
  return (
    <nav className="m-auto w-full max-w-5xl flex justify-between p-2 gap-9 relative">
      <Logo />
      <Search />
    </nav>
  )
}
