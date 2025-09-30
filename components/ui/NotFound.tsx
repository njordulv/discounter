'use client'

import { Button } from '@/components/ui/Button'
import config from '@/config'

const NotFound = () => {
  return (
    <Button
      size="md"
      variant="outline"
      text={config.pages.notFound.goHome}
      className="!w-fit"
      onClick={() => window.open('/', '_self')}
    />
  )
}

export default NotFound
