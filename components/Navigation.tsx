import Logo from '@/components/Logo'
import { SearchInput } from '@/components/SearchInput'

export const Navigation = () => {
  return (
    <nav className="m-auto w-full max-w-5xl flex justify-between p-2 gap-9 relative">
      <Logo />
      <SearchInput />
    </nav>
  )
}
