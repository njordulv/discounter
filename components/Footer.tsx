import { getMonthAndYear } from '@/utils/functions'

export default function Footer() {
  return (
    <footer className="p-4 bg-black text-white flex justify-center gap-6">
      <p>{`© Copyright ${
        getMonthAndYear().year
      } by Njordr. All rights reversed.`}</p>
    </footer>
  )
}
