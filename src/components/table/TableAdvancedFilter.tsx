import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTableContext } from './TableContext'

export default function TableAdvancedFilter({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { model, setModel } = useTableContext()
  const [filterParams, setFilterParams] = useState<any>({})
  const filter = (advancedFilter: any) => {
    setModel((model) => {
      return {
        ...model,
        viewData:
          Object.keys(advancedFilter).length === 0
            ? model.data
            : model.data.filter((item: any) => {
                for (const key in advancedFilter) {
                  if (
                    item[key] &&
                    item[key]?.toString().toLowerCase().includes(advancedFilter[key].toLowerCase())
                  ) {
                    return true
                  }
                }
                return false
              }),
      }
    })
  }

  const ref = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <div
      className="absolute z-10 flex flex-col rounded-lg bg-primary"
      ref={ref}>
      <div className="mt-2 grid w-full grid-cols-4 grid-rows-4 gap-2 p-3">
        {model.columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col gap-x-2">
            <span className="text-white">{column.label}</span>
            <input
              className="rounded-lg p-2"
              value={filterParams[column.id] || ''}
              onChange={(e) => setFilterParams({ ...filterParams, [column.id]: e.target.value })}
              type="text"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 pb-5 pr-5">
        <button
          className="rounded-xl bg-secondary p-4 text-white hover:bg-tertiary"
          onClick={() => {
            filter(filterParams)
            setOpen(!open)
          }}>
          Buscar
        </button>
        <button
          className="rounded-xl bg-secondary p-4 text-white hover:bg-red-500"
          onClick={() => {
            filter({})
            setFilterParams({})
            setOpen(!open)
          }}>
          Limpar
        </button>
      </div>
    </div>
  )
}
