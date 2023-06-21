import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import { useState } from 'react'
import EditMaterials from '../pages/materials/EditMaterials'
import EditOrders from '../pages/orders/EditOrders'
import EditContracts from '../pages/contracts/EditContracts'

export default function TableEditButton({ type }: { type: 'add' | 'edit' }) {
  const { model } = useTableContext()
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
              <EditContracts
                setOpen={setOpen}
                type={type}
              />
            ) : model === 'materials' ? (
              <EditMaterials
                setOpen={setOpen}
                type={type}
              />
            ) : model === 'orders' ? (
              <EditOrders
                setOpen={setOpen}
                type={type}
              />
            ) : (
              <></>
            )
          }
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
