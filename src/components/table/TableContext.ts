import { Table } from '@tanstack/react-table'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export const TableContext = createContext<{
  api: string
  model: string
  table: Table<any>
  globalFilter: string
  setTableData: Dispatch<SetStateAction<any[]>>
  setGlobalFilter: Dispatch<SetStateAction<string>>
} | null>(null)

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (context === null) {
    throw new Error('useTableContext must be used within a TableContextProvider')
  }
  return context
}
