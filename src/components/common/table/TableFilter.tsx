import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { FaCaretDown } from 'react-icons/fa'
import { useTableContext } from './TableContext'
import Input from '../Input'

export default function TableFilter() {
  const { table, globalFilter, setGlobalFilter } = useTableContext()
  return (
    <div className="join flex items-center">
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="input join-item w-[52rem]"
      />
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button className="join-item btn">
            <FaCaretDown className="text-2xl" />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content
          align="end"
          alignOffset={55}
          asChild>
          <div className="z-10 w-[52rem] bg-accent p-3">
            <div className="grid select-none grid-cols-4 gap-2">
              {table.getAllLeafColumns().map((column) => (
                <div
                  key={column.id}
                  className="flex flex-col">
                  <label htmlFor="">
                    {column.columnDef.header?.toString()}
                  </label>
                  <Input
                    type={column.columnDef.meta?.inputType ?? 'text'}
                    value={column.getFilterValue() ?? ''}
                    onChange={column.setFilterValue}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-row-reverse">
              <button className="btn bg-error">Limpar</button>
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  )
}
