import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Model } from '../../../types'
import { TableContext } from './TableContext'

export default function TableModel({
  model,
  setModel,
  selected,
  setSelected,
  children,
}: {
  model: Model
  setModel: Dispatch<SetStateAction<Model>>
  selected: any
  setSelected: Dispatch<SetStateAction<any>>
  children: ReactNode
}) {
  return (
    <TableContext.Provider value={{ model, setModel, selected, setSelected }}>
      {children}
    </TableContext.Provider>
  )
}
