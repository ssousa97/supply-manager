import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { FaBars } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import { ReactNode } from 'react'

export default function TableColumnSelector() {
  const { table } = useTableContext()

  return (
    <div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <div
            className="ml-2 rounded-xl bg-primary p-2 text-3xl text-white hover:cursor-pointer
                           hover:bg-tertiary">
            <FaBars />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content
          align="end"
          alignOffset={-10}
          sideOffset={10}
          asChild>
          <div className="z-10 flex flex-col rounded-xl  bg-primary p-2 text-white">
            {table.getAllLeafColumns().map((column) => (
              <label key={column.id}>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.columnDef.header as ReactNode}
              </label>
            ))}
          </div>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  )
}
