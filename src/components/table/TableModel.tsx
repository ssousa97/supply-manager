import { Dispatch, SetStateAction } from 'react'
import TableData from './TableData'
import TableFilter from './TableFilter'
import { Model } from '../../../types'

type TableModelProps<T> = {
  model: Model<T>
  setModel: Dispatch<SetStateAction<Model<T>>>
}
export default function TableModel<T>({ model, setModel }: TableModelProps<T>) {
  return (
    <>
      <TableFilter
        model={model}
        setModel={setModel}
      />
      <TableData model={model} />
    </>
  )
}
