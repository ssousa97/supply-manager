import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Dispatch, SetStateAction, useState } from 'react'
import { TableContext } from './TableContext'
import TableControls from './TableControls'
import TableData from './TableData'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

export type TableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  api: string
  model: string
  initialColumnVisibility: Record<string, boolean>
  setTableData: Dispatch<SetStateAction<T[]>>
}

export default function Table<T>({
  data,
  columns,
  api,
  model,
  initialColumnVisibility,
  setTableData,
}: TableProps<T>) {
  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility ?? {}
  )
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <TableContext.Provider
      value={{
        table,
        api,
        model,
        globalFilter,
        setGlobalFilter,
        setTableData,
      }}>
      <div className="m-6 grid max-h-[90vh] grid-rows-[1fr_8fr] gap-10 rounded-xl bg-neutral p-4 shadow-2xl">
        <TableControls />
        <TableData />
      </div>
    </TableContext.Provider>
  )
}
