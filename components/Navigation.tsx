import Logo from '@/components/Logo'
import { SearchInput } from '@/components/SearchInput'

export const Navigation = () => {
  return (
    <nav className="m-auto w-full max-w-5xl flex flex-col md:flex-row justify-between p-2 gap-2 relative">
      <Logo color="var(--accent-foreground)" height={36} width={180} />
      <SearchInput />
    </nav>
  )
}
