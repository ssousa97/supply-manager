import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useTableContext } from './TableContext'
import { ReactNode } from 'react'
import { FaBars } from 'react-icons/fa'

export default function TableColumnSelector() {
  const { table } = useTableContext()
  return (
    <div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button className="btn text-xl">
            <FaBars />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content
          align="end"
          alignOffset={-10}
          sideOffset={10}
          asChild>
          <div className="z-10 flex flex-col rounded-lg bg-accent p-2 text-white">
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
