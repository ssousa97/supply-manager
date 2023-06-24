import { flexRender } from '@tanstack/react-table'
import { useTableContext } from './TableContext'

export default function TableData() {
  const { table } = useTableContext()
  return (
    <div className="overflow-auto rounded-lg">
      <table className="table-pin-rows table-zebra table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-lg">
              {headerGroup.headers.map((column) => (
                <th key={column.id}>
                  {column.isPlaceholder
                    ? null
                    : flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={row.getToggleSelectedHandler()}
              className={`hover whitespace-nowrap hover:cursor-pointer ${
                row.getIsSelected() ? '!bg-base-300' : ''
              }`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
