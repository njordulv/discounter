import { MdImageNotSupported } from 'react-icons/md'

export const FallbackImage = () => (
  <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
    <MdImageNotSupported size={32} className="text-gray-500" />
  </div>
)
