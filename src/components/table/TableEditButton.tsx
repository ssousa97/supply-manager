import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import TableEditDialog from './TableEditDialog'
import { useState } from 'react'

export default function TableEditButton() {
  const { table } = useTableContext()
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div
            onClick={() => setOpen(true)}
            className="ml-2 select-none rounded-xl bg-primary p-2 text-3xl text-white 
                         hover:cursor-pointer hover:bg-tertiary">
            <FaEdit />
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-[rgb(0,0,0,0.5)]" />
        <Dialog.Content>
          <TableEditDialog
            setDialogOpen={setOpen}
            selectedRow={table.getSelectedRowModel().rows[0] ?? { original: null }}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
