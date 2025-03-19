import Link from 'next/link'
import Logo from '@/components/Logo'
import Categories from '@/components/emag/Categories'

export const Navigation = () => {
  return (
    <nav className="p-4">
      <div className="m-auto w-full max-w-4xl flex gap-9 relative">
        <Logo />
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/all-deals">All Deals</Link>
          </li>
        </ul>
        <Categories />
      </div>
    </nav>
  )
}
