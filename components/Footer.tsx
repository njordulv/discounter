import { getYear } from '@/utils'

export default function Footer() {
  return (
    <footer className="p-2 bg-card text-card-foreground flex justify-center gap-6">
      <p>{`© Copyright ${getYear()} by Njordr. All rights reversed.`}</p>
    </footer>
  )
}
