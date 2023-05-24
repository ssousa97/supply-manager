import Logo from './Logo'
import Pages from './Pages'
import User from './User'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`${className} grid grid-rows-[1fr_5fr_1fr] bg-primary`}>
      <Logo />
      <Pages />
      <User />
    </div>
  )
}
