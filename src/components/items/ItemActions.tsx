import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit } from 'react-icons/fa'
import ItemEditDialog from './ItemEditDialog'

export default function ItemActions() {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn text-xl">
            <FaEdit />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-25" />
          <Dialog.Content className="fixed left-[50%] top-[50%]">
            <ItemEditDialog />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
