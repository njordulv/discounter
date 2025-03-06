import Link from 'next/link'

export const Navigation = () => {
  return (
    <nav className="p-4 flex justify-center gap-6 relative">
      <Link href="/">Home</Link>
      <Link href="/all-deals">All Deals</Link>
    </nav>
  )
}
