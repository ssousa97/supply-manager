import * as Dialog from '@radix-ui/react-dialog'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import TableAddDialog from './TableAddDialog'

export default function TableAddButton() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div
            className="ml-2 rounded-xl bg-primary p-2 text-3xl text-white hover:cursor-pointer 
                         hover:bg-tertiary">
            <FaPlus />
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-[rgb(0,0,0,0.5)]" />
        <Dialog.Content>
          <TableAddDialog setDialogOpen={setOpen} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
