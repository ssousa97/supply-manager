import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { Model } from '../../../types'

export const TableContext = createContext<{
  model: Model
  setModel: Dispatch<SetStateAction<Model>>
  selected: any
  setSelected: Dispatch<SetStateAction<any>>
} | null>(null)

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (context === null) {
    throw new Error('useTableContext must be used within a TableContextProvider')
  }
  return context
}
