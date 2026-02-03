import { MdImageNotSupported } from 'react-icons/md'

export const FallbackImage = () => (
  <div className="w-44 h-44 flex items-center justify-center bg-gray-200 rounded-lg">
    <MdImageNotSupported size={44} className="text-gray-500 object-contain" />
  </div>
)
