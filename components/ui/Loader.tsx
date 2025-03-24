import { TbLoader2 } from 'react-icons/tb'

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex mx-auto items-center justify-center min-h-screen">
      <TbLoader2 size={44} className="animate-spin text-muted-foreground" />
    </div>
  )
}

export default Loader
