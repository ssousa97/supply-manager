import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Model } from '../../../types'
import { TableContext } from './TableContext'

export default function TableModel({
  model,
  setModel,
  children,
}: {
  model: Model
  setModel: Dispatch<SetStateAction<Model>>
  children: ReactNode
}) {
  return <TableContext.Provider value={{ model, setModel }}>{children}</TableContext.Provider>
}
