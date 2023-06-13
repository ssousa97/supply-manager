import { Row } from '@tanstack/react-table'
import { useState, ReactNode, Dispatch, SetStateAction } from 'react'
import { useTableContext } from './TableContext'
import TableInput from './TableInput'

type TableEditDialogProps = {
  selectedRow: Row<any>
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function TableEditDialog({ selectedRow, setDialogOpen }: TableEditDialogProps) {
  const { setTableData, api } = useTableContext()
  const [editValue, setEditValue] = useState(selectedRow.original)
  const handleClick = () => {
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
  }

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
              <TableInput
                inputType={cell.column.columnDef.meta?.inputType}
                value={editValue[cell.column.id]}
                onChange={(value: any) =>
                  setEditValue((prev: any) => ({ ...prev, [cell.column.id]: value }))
                }
              />
            </div>
          ))}
      </div>
      <div className="mt-10 flex items-center justify-end text-xl text-white">
        <button
          onClick={handleClick}
          className="rounded-xl bg-secondary p-2 hover:bg-tertiary">
          Salvar
        </button>
      </div>
    </div>
  )
}
