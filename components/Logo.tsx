import Link from 'next/link'
import SVGIcon from '@/components/ui/SVGIcon'
import config from '@/config'

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label={config.site.logoLabel}
      rel={config.site.rel}
      className="flex items-center justify-center gap-2 text-4xl leading-8 text-[hsl(var(--background))]"
    >
      <SVGIcon width={162} height={32} />
    </Link>
  )
}

export default Logo
