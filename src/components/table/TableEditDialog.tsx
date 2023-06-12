import { Row } from '@tanstack/react-table'
import { useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { useTableContext } from './TableContext'

export default function TableEditDialog({
  selectedRow,
  setDialogOpen,
}: {
  selectedRow: Row<any>
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { setTableData, api } = useTableContext()
  const [editValue, setEditValue] = useState(selectedRow.original)

  if (!editValue) {
    setDialogOpen(false)
    return <></>
  }
  return (
    <div className="fixed left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary p-4">
      <div className="grid grid-cols-3 gap-3">
        {selectedRow
          .getAllCells()
          .filter((cell) => cell.column.columnDef.meta?.isEditable)
          .map((cell) => (
            <div
              key={cell.column.id}
              className="flex flex-col">
              <label className="text-white">{cell.column.columnDef.header as ReactNode}</label>
              {cell.column.columnDef.meta && cell.column.columnDef.meta.input ? (
                cell.column.columnDef.meta.input(editValue[cell.column.id], (value: any) => {
                  setEditValue((prev: any) => ({ ...prev, [cell.column.id]: value }))
                })
              ) : (
                <input
                  type="text"
                  className="rounded-xl p-2"
                  value={editValue[cell.column.id] ?? ''}
                  onChange={(e) =>
                    setEditValue((prev: any) => ({ ...prev, [cell.column.id]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
      </div>
      <div className="mt-10 flex items-center justify-end text-xl text-white">
        <button
          onClick={() => {
            setTableData((oldData) => {
              oldData[selectedRow.index] = editValue
              return [...oldData]
            })

            fetch(api + '/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(editValue),
            })
            setDialogOpen(false)
          }}
          className="rounded-xl bg-secondary p-2 hover:bg-tertiary">
          Salvar
        </button>
      </div>
    </div>
  )
}
