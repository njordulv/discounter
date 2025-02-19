import Link from 'next/link'

export const Navigation = () => {
  return (
    <nav className="p-4 bg-black text-white flex justify-center gap-6">
      <Link href="/">Home</Link>
      <Link href="/add-deal">Add deal</Link>
    </nav>
  )
}
