import Link from 'next/link'

export const Navigation = () => {
  return (
    <nav className="p-4 text-white flex justify-center gap-6 bg-black/80 backdrop-blur-sm">
      <Link href="/">Home</Link>
      <Link href="/all-deals">All Deals</Link>
    </nav>
  )
}
