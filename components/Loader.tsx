import { TbLoader2 } from 'react-icons/tb'

const Loader = () => {
  return (
    <div className="flex gap-1 mx-auto items-center justify-center mt-[-4rem] h-screen">
      <TbLoader2 size={44} className="animate-spin text-slate-500" />
    </div>
  )
}

export default Loader
