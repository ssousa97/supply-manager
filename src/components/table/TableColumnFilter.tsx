import { ChangeEvent, useState } from 'react'
import { useTableContext } from './TableContext'

export default function TableColumnFilter() {
  const { model } = useTableContext()
  const [openColumnSelector, setOpenColumnSelector] = useState(false)

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked, e.target.value)
  }

  return (
    <div>
      <span
        className="text-white hover:cursor-pointer hover:text-tertiary hover:underline"
        onClick={() => setOpenColumnSelector(!openColumnSelector)}>
        Colunas
      </span>
      {openColumnSelector && (
        <div className="absolute z-10 flex flex-col rounded-lg bg-primary">
          <div className="mt-2  p-3">
            {model.columns.map((column) => (
              <div
                key={column.id}
                className="flex gap-x-2">
                <input
                  type="checkbox"
                  value={column.id}
                  checked={column.isVisible}
                  onChange={handleCheck}
                />
                <span className="text-white">{column.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
