import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { AiFillCaretDown } from 'react-icons/ai'
import { useTableContext } from './TableContext'
import { ReactNode } from 'react'
import AdvancedInput from '../common/AdvancedInput'

export default function TableColumnFilter() {
  const { table } = useTableContext()
  const cleanFilters = () => {
    table.getAllLeafColumns().forEach((column) => column.setFilterValue(''))
  }
  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className="absolute bottom-0 right-0 mr-2 text-4xl text-primary hover:cursor-pointer 
                       hover:text-tertiary focus:outline-none">
        <AiFillCaretDown />
      </Dropdown.Trigger>
      <Dropdown.Content
        side="bottom"
        align="end"
        alignOffset={-10}
        asChild>
        <div className="z-10 flex select-none flex-col rounded-xl bg-primary p-4  ">
          <div className="grid w-[50rem] grid-cols-4 gap-3 rounded-xl">
            {table.getAllLeafColumns().map((column) => (
              <div
                className="flex flex-col"
                key={column.id}>
                <label className="text-white">
                  {column.columnDef.header as ReactNode}
                </label>
                <AdvancedInput
                  type={column.columnDef.meta?.inputType}
                  value={(column.getFilterValue() as string) ?? ''}
                  onChange={column.setFilterValue}
                />
              </div>
            ))}
          </div>
          <button
            onClick={cleanFilters}
            className="self-end rounded-xl bg-red-500 p-3 text-white hover:bg-red-700">
            Limpar
          </button>
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
