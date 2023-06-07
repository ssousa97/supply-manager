import * as Dialog from '@radix-ui/react-dialog'
import { useTableContext } from './TableContext'

export default function TableEditDialog({
  children,
  editType,
}: {
  children: React.ReactNode
  editType: 'add' | 'edit'
}) {
  const { model } = useTableContext()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgb(0,0,0,0.5)] data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] 
                     translate-y-[-50%] rounded-lg bg-primary p-5
                     focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-white">
            {editType === 'add' ? 'Add data' : 'Edit data'}
          </Dialog.Title>
          <div className="z-10 flex flex-col rounded-lg ">
            <div className="mt-2 grid w-full grid-cols-2 grid-rows-4 gap-2 p-3">
              {model.columns.map((column) => (
                <div
                  key={column.id}
                  className="flex flex-col gap-x-2">
                  <span className="text-white">{column.label}</span>
                  <input
                    className="rounded-lg p-2"
                    type="text"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="my-4 flex justify-end">
            <Dialog.Close asChild>
              <button
                className="items-center justify-center rounded-[4px] bg-secondary px-2 py-2
                           font-medium text-white hover:bg-tertiary">
                {editType === 'add' ? 'Add data' : 'Edit data'}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
