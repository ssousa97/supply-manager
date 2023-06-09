import * as Dialog from '@radix-ui/react-dialog'
import { FaEdit } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import { ReactNode } from 'react'

export default function TableEditButton() {
  const { table } = useTableContext()
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div
            className="ml-2 rounded-xl bg-primary p-2 text-3xl text-white hover:cursor-pointer 
                         hover:bg-tertiary">
            <FaEdit />
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-[rgb(0,0,0,0.5)]" />
        <Dialog.Content>
          <div className="fixed left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary p-4">
            <div className="grid grid-cols-3 gap-3">
              {table.getSelectedRowModel().rows.map((row) =>
                row.getAllCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="flex flex-col">
                    <label className="text-white">
                      {cell.column.columnDef.header as ReactNode}
                    </label>
                    <input
                      className="rounded-xl p-2"
                      value={cell.getValue()}
                    />
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-end text-xl text-white">
              <button className="rounded-xl bg-secondary p-2 hover:bg-tertiary">Adicionar</button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
