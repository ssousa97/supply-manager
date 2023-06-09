import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { AiFillCaretDown } from 'react-icons/ai'
import { useTableContext } from './TableContext'
import { ReactNode } from 'react'

export default function TableColumnFilter() {
  const { table } = useTableContext()
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
        <div className="z-10 grid w-[50rem] select-none grid-cols-4 gap-3 rounded-xl bg-primary p-4">
          {table.getAllLeafColumns().map((column) => (
            <div
              className="flex flex-col"
              key={column.id}>
              <label className="text-white">{column.columnDef.header as ReactNode}</label>
              <input
                type="text"
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="rounded-xl p-2"
              />
            </div>
          ))}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
