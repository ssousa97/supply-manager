import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import { useState } from 'react'
import EditContracts from '../pages/EditContracts'
import EditItems from '../pages/EditItems'
import EditOrders from '../pages/EditOrders'

export default function TableEditButton({ type }: { type: 'add' | 'edit' }) {
  const { table, model } = useTableContext()
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
            {type === 'add' ? <FaPlus /> : <FaEdit />}
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-[rgb(0,0,0,0.5)]" />
        <Dialog.Content>
          {
            // TODO: Improve this, make more generic..
            model === 'contracts' ? (
              <EditContracts setOpen={setOpen} />
            ) : model === 'items' ? (
              <EditItems setOpen={setOpen} />
            ) : model === 'orders' ? (
              <EditOrders setOpen={setOpen} />
            ) : (
              <></>
            )
          }
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
