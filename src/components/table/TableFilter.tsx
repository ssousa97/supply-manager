import { Dispatch, SetStateAction, useRef } from 'react'
import { debounce } from 'lodash'
import { Model } from '../../../types'

type TableFilterProps<T> = {
  model: Model<T>
  setModel: Dispatch<SetStateAction<Model<T>>>
}

export default function TableFilter<T>({ model, setModel }: TableFilterProps<T>) {
  const filter = (val: string) => {
    setModel({
      ...model,
      viewData:
        val === ''
          ? model.data
          : model.data.filter((item) => {
              for (const key in item) {
                if (item[key] && item[key]?.toString().toLowerCase().includes(val.toLowerCase())) {
                  return true
                }
              }
              return false
            }),
    })
  }
  const debounceFilter = useRef(debounce((val) => filter(val), 500)).current

  return (
    <div className="flex items-center justify-between gap-x-2">
      <input
        type="text"
        className="flex-1 rounded-lg p-2 text-xl"
        onChange={(e) => debounceFilter(e.target.value)}
      />
      <button className="rounded-lg bg-tertiary p-3 text-white hover:bg-primary">Filtrar</button>
    </div>
  )
}
