import { Button } from '@/components/ui/Button'
import config from '@/config'

export const LoadFailed = () => {
  return (
    <div className="m-auto w-full max-w-4xl min-h-[calc(100vh-24rem)] flex flex-col items-center place-content-center gap-4">
      <p>{config.messages.failedToLoad}</p>
      <Button
        size="md"
        variant="destructive"
        text="Retry"
        onClick={() => location.reload()}
        className="w-fit"
      />
    </div>
  )
}
