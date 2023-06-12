import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { useTableContext } from './TableContext'

export default function TableAddDialog({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { table, setTableData, api } = useTableContext()
  const [newValue, setNewValue] = useState<any>({})
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="fixed left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary p-4">
      <div className="grid grid-cols-3 gap-3">
        {table
          .getAllLeafColumns()
          .filter((column) => column.columnDef.meta?.isCreatable)
          .map((column) => (
            <div
              key={column.id}
              className="flex flex-col">
              <label className="text-white">{column.columnDef.header as ReactNode}</label>
              {column.columnDef.meta && column.columnDef.meta.input ? (
                column.columnDef.meta.input(newValue[column.id], (value: any) => {
                  setNewValue((prev: any) => ({ ...prev, [column.id]: value }))
                })
              ) : (
                <input
                  type="text"
                  className="rounded-xl p-2"
                  value={newValue[column.id] ?? ''}
                  onChange={(e) =>
                    setNewValue((prev: any) => ({ ...prev, [column.id]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center justify-end text-xl text-white">
        <button
          onClick={() => {
            if (Object.values(newValue).every((v) => !v)) {
              setError('Campos inválidos')
              return
            }
            setTableData((oldData) =>
              oldData && oldData.length > 0 ? [...oldData, newValue] : [newValue]
            )
            fetch(api + '/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newValue),
            })
            setDialogOpen(false)
          }}
          className="rounded-xl bg-secondary p-2 hover:bg-tertiary">
          Adicionar
        </button>
      </div>
    </div>
  )
}
