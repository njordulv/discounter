import Link from 'next/link'
import SVGIcon from '@/components/ui/SVGIcon'
import config from '@/config'

const Logo = ({
  color,
  height,
  width,
}: {
  color: string
  height: number
  width: number
}) => {
  return (
    <Link href="/" aria-label={config.site.logoLabel} rel={config.site.rel}>
      <SVGIcon width={width} height={height} color={color} />
    </Link>
  )
}

export default Logo
