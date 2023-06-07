import { ChangeEvent } from 'react'
import { useTableContext } from './TableContext'
import { FiBarChart2 } from 'react-icons/fi'
import * as Dropdown from '@radix-ui/react-dropdown-menu'

export default function TableColumnFilter() {
  const { model, setModel } = useTableContext()
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) =>
    setModel((model) => {
      const columnId = e.target.value
      const columnIndex = model.columns.findIndex((c) => c.id === columnId)
      model.columns[columnIndex].isVisible = e.target.checked
      return { ...model }
    })

  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <div
            className="select-none rounded-xl bg-primary p-1 text-center text-white hover:cursor-pointer hover:bg-tertiary
                     hover:underline focus:outline-none">
            <FiBarChart2
              className="select-none text-4xl focus:outline-none"
              data-tooltip-id="columns"
              data-tooltip-content="Colunas"
            />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content
          asChild
          align="end"
          sideOffset={5}>
          <div className="z-10 flex flex-col rounded-lg bg-primary">
            <div className="mt-2 p-3">
              {model.columns.map((column) => (
                <div
                  key={column.id}
                  className="flex   justify-between gap-x-2">
                  <label className="text-white">{column.label}</label>
                  <input
                    className="rounded-lg p-2"
                    value={column.id}
                    onChange={handleCheck}
                    type="checkbox"
                    checked={column.isVisible}
                  />
                </div>
              ))}
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown.Root>
    </>
  )
}
