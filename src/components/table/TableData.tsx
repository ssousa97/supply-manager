import { ReactNode } from 'react'
import { Model } from '../../../types'

export default function TableData<T>({ model }: { model: Model<T> }) {
  return (
    <div className="overflow-auto">
      <table className="w-full bg-accent">
        <thead className="sticky top-0 bg-primary text-sm text-white">
          <tr>
            {model.columns.map((column) => (
              <th
                className="border-2"
                key={column.toString()}>
                <span className="text-center">{column as ReactNode}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {model.viewData.map((item, index) => (
            <tr
              className="border-b-2 border-gray-300 hover:cursor-pointer hover:bg-secondary hover:text-white"
              key={index}>
              {model.columns.map((column) => (
                <td
                  className="whitespace-nowrap border-x-2 text-center"
                  key={column.toString()}>
                  {item[column] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
