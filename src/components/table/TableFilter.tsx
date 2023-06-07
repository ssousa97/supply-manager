import { debounce } from 'lodash'
import { useRef } from 'react'
import { useTableContext } from './TableContext'

export default function TableFilter() {
  const { setModel } = useTableContext()

  const filter = (val: string) => {
    setModel((model) => {
      return {
        ...model,
        viewData:
          val === ''
            ? model.data
            : model.data.filter((item: any) => {
                for (const key in item) {
                  if (
                    item[key] &&
                    item[key]?.toString().toLowerCase().includes(val.toLowerCase())
                  ) {
                    return true
                  }
                }
                return false
              }),
      }
    })
  }
  const debounceFilter = useRef(debounce((val) => filter(val), 500)).current
  return (
    <input
      type="text"
      className="min-w-[52rem] max-w-full rounded-lg p-2 text-xl"
      onChange={(e) => debounceFilter(e.target.value)}
    />
  )
}
