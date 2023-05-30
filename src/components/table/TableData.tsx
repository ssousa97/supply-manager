import { ReactNode } from 'react'
import { useTableContext } from './TableContext'

export default function TableData() {
  const { model } = useTableContext()
  return (
    <div className="overflow-auto">
      <table className="w-full bg-accent">
        <thead className="sticky top-0 bg-primary text-white">
          <tr>
            {model.columns
              // filter((c) => c.isVisible)
              .map((column) => (
                <th
                  className="border-x-2 p-2"
                  key={column.id as string}>
                  <span className="text-center text-xl">{column.label as ReactNode}</span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {model.viewData.map((item: any, index) => (
            <tr
              className="border-b-2 border-gray-300  hover:cursor-pointer hover:bg-secondary hover:text-white"
              key={index}>
              {model.columns
                // .filter((c) => c.isVisible)
                .map((column) => (
                  <td
                    className="min-w-[5rem] max-w-[12rem] overflow-hidden whitespace-nowrap border-x-2 text-center"
                    key={column.id as string}>
                    {item[column.id] as ReactNode}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
