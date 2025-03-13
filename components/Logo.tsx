import Image from 'next/image'
import Link from 'next/link'
import SvgLogo from '@/app/logo-full.svg'
import config from '@/config'

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label={config.site.logoLabel}
      rel={config.site.rel}
      className="flex items-center justify-center gap-2 text-4xl leading-8"
    >
      <Image priority src={SvgLogo} width={162} height={32} alt="Logo" />
    </Link>
  )
}

export default Logo
