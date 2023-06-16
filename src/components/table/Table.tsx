import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  RowData,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Dispatch, SetStateAction, useState } from 'react'
import TableData from './TableData'
import { TableContext } from './TableContext'
import TableAddButton from './TableAddButton'
import TableColumnFilter from './TableColumnFilter'
import TableColumnSelector from './TableColumnSelector'
import TableEditButton from './TableEditButton'
import TableFilter from './TableFilter'
import TableRemoveButton from './TableRemoveButton'
import TableUploadButton from './TableUploadButton'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    isCreatable?: boolean
    isEditable?: boolean
    /** Returns a JSX element that is responsible to handle the column input */
    input?: (value: TValue, onChange: (value: TValue) => void) => JSX.Element
    inputType?: string
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank,
  })
  return itemRank.passed
}

type TableProps<T> = {
  data: T[]
  api: string
  model: string
  setTableData: Dispatch<SetStateAction<T[]>>
  columns: ColumnDef<T, any>[]
  initialColumnVisibility?: Record<string, boolean>
}
export default function Table<T>({
  data,
  api,
  model,
  setTableData,
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
    <TableContext.Provider
      value={{ table, api, model, globalFilter, setGlobalFilter, setTableData }}>
      <div className="grid h-full grid-rows-[1fr_9fr]">
        <div className="flex items-center">
          <div className="relative w-[50rem]">
            <TableFilter />
            <TableColumnFilter />
          </div>
          <TableColumnSelector />
          <TableEditButton type="add" />
          <TableEditButton type="edit" />
          <TableRemoveButton />
          <TableUploadButton />
        </div>
        <TableData />
      </div>
    </TableContext.Provider>
  )
}
