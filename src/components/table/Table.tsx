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
import TableData from './TableData'
import { TableContext } from './TableContext'
import { FaMinus } from 'react-icons/fa'
import TableAddButton from './TableAddButton'
import TableColumnFilter from './TableColumnFilter'
import TableColumnSelector from './TableColumnSelector'
import TableEditButton from './TableEditButton'
import TableFilter from './TableFilter'
import TableRemoveButton from './TableRemoveButton'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

type TableProps<T> = {
  data: T[]
  setData: Dispatch<SetStateAction<T[]>>
  columns: ColumnDef<T, any>[]
  initialColumnVisibility?: Record<string, boolean>
}
export default function Table<T>({
  data,
  setData,
  columns,
  initialColumnVisibility,
}: TableProps<T>) {
  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility ?? {})
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
    <TableContext.Provider value={{ table, globalFilter, setGlobalFilter, setData }}>
      <div className="grid h-full grid-rows-[1fr_9fr]">
        <div className="flex items-center">
          <div className="relative w-[50rem]">
            <TableFilter />
            <TableColumnFilter />
          </div>
          <TableColumnSelector />
          <TableAddButton />
          <TableRemoveButton />
          <TableEditButton />
        </div>
        <TableData />
      </div>
    </TableContext.Provider>
  )
}
