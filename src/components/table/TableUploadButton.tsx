import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import TableUploadDialog from './TableUploadDialog'

export default function TableUploadButton() {
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
            <FaFileUpload />
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-[rgb(0,0,0,0.5)]" />
        <Dialog.Content>
          <TableUploadDialog setDialogOpen={setOpen} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
