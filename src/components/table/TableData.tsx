import { flexRender } from '@tanstack/react-table'
import { useTableContext } from './TableContext'

export default function TableData() {
  const { table } = useTableContext()

  return (
    <div className="overflow-auto rounded-xl border-2 bg-accent">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="select-none whitespace-nowrap">
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="z-1 sticky top-0 border-2 bg-primary p-1 text-white">
                  {column.isPlaceholder
                    ? null
                    : flexRender(column.column.columnDef.header, column.getContext())}
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
              className={`${
                row.getIsSelected() ? 'bg-tertiary text-white' : 'odd:bg-gray-300'
              } border-2 border-gray-500 hover:cursor-pointer hover:bg-tertiary 
                hover:text-white`}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap text-center"
                  key={cell.id}>
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
