import { getYear } from '@/utils'

export default function Footer() {
  return (
    <footer className="p-3 text-sm bg-card text-card-foreground flex justify-center text-center gap-6">
      <p>{`© Copyright ${getYear()} by Njordr. All rights reversed.`}</p>
    </footer>
  )
}
