import { useTableContext } from './TableContext'
import { Column } from '../../../types'
import { BiSort } from 'react-icons/bi'
import { useState } from 'react'

function renderItem(column: Column, item: any) {
  let content = item[column.id]
  if (column.format) content = column.format(item[column.id])
  if (column.prefix) content = column.prefix + ' ' + content
  if (column.suffix) content = content + ' ' + column.suffix
  return content
}

const sortOrders = ['default', 'asc', 'desc']

const ascCompareFn = (a: any, b: any) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const descCompareFn = (a: any, b: any) => {
  if (a < b) return 1
  if (a > b) return -1
  return 0
}

export default function TableData() {
  const { model, setModel, setSelected } = useTableContext()
  const [sortOrder, setSortOrder] = useState('default')
  const [selectedRow, setSelectedRow] = useState(-1)

  const sortColumn = (columnId: string, sortOrder: string) => {
    const column = model.columns.find((c) => c.id === columnId)
    if (!column) return
    const viewData = [...model.viewData]
    if (sortOrder === 'default') {
      setModel((model) => {
        return {
          ...model,
          viewData: model.data,
        }
      })
      return
    }
    if (sortOrder === 'asc')
      viewData.sort((a: any, b: any) => ascCompareFn(a[columnId], b[columnId]))
    if (sortOrder === 'desc')
      viewData.sort((a: any, b: any) => descCompareFn(a[columnId], b[columnId]))
    setModel((model) => {
      return {
        ...model,
        viewData,
      }
    })
  }
  return (
    <div className="overflow-auto">
      <table className="w-full bg-accent">
        <thead className="sticky top-0 bg-primary text-white">
          <tr>
            {model.columns
              .filter((c) => c.isVisible)
              .map((column) => (
                <th
                  className="border-x-2 p-2"
                  key={column.id}>
                  <span className="flex items-center justify-between whitespace-nowrap text-center text-xl">
                    {column.label}
                    <BiSort
                      className={` hover:cursor-pointer hover:text-tertiary`}
                      onClick={() => {
                        const index = sortOrders.indexOf(sortOrder)
                        const nextIndex = (index + 1) % sortOrders.length
                        const nextSortOrder = sortOrders[nextIndex]
                        sortColumn(column.id, nextSortOrder)
                        setSortOrder(nextSortOrder)
                      }}
                    />
                  </span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {model.viewData.map((item: any, index) => (
            <tr
              onClick={() => {
                setSelected(item)
                setSelectedRow(index)
              }}
              // className="border-b-2 border-gray-300  hover:cursor-pointer hover:bg-secondary hover:text-white"
              className={`${selectedRow === index ? 'bg-secondary text-white' : ''} 
                          border-b-2 border-gray-300  hover:cursor-pointer hover:bg-secondary hover:text-white`}
              key={index}>
              {model.columns
                .filter((c) => c.isVisible)
                .map((column) => (
                  <td
                    className="min-w-[5rem] max-w-[12rem] overflow-hidden whitespace-nowrap border-x-2 text-center"
                    key={column.id}>
                    {renderItem(column, item)}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
