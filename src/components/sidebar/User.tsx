import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'

export default function User() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="m-auto h-fit w-fit scale-150 rounded-full border-2 p-1 text-white hover:cursor-pointer 
                   hover:bg-tertiary">
          <FaUserAlt />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          sideOffset={20}
          className="flex min-w-[10rem] flex-col gap-2 rounded-lg bg-secondary
          data-[side=bottom]:animate-slideUpAndFade 
          data-[side=left]:animate-slideRightAndFade 
          data-[side=right]:animate-slideLeftAndFade 
          data-[side=top]:animate-slideDownAndFade">
          <DropdownMenu.Item className="p-2 hover:rounded-lg hover:bg-tertiary">
            <Link
              to="/config"
              className="text-white">
              Configurações
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 hover:cursor-pointer hover:rounded-lg hover:bg-tertiary">
            <span className="text-white">Logout</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
