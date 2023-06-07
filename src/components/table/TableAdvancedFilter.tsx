import { useState } from 'react'
import { useTableContext } from './TableContext'
import { AiFillCaretDown } from 'react-icons/ai'
import * as Dropdown from '@radix-ui/react-dropdown-menu'

export default function TableAdvancedFilter() {
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

  return (
    <>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <AiFillCaretDown
            className="absolute right-2 top-1/2 -translate-y-1/2 transform select-none text-4xl 
                     hover:cursor-pointer hover:text-tertiary"
          />
        </Dropdown.Trigger>
        <Dropdown.Content
          asChild
          align="end"
          sideOffset={20}>
          <div className="z-10 flex w-[52rem] select-none flex-col rounded-lg bg-primary">
            <div className="mt-2 grid w-full grid-cols-4 grid-rows-4 gap-2 p-3">
              {model.columns.map((column) => (
                <div
                  key={column.id}
                  className="flex flex-col gap-x-2">
                  <span className="text-white">{column.label}</span>
                  <input
                    className="rounded-lg p-2"
                    value={filterParams[column.id] || ''}
                    onChange={(e) =>
                      setFilterParams({ ...filterParams, [column.id]: e.target.value })
                    }
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
                }}>
                Buscar
              </button>
              <button
                className="rounded-xl bg-secondary p-4 text-white hover:bg-red-500"
                onClick={() => {
                  filter({})
                  setFilterParams({})
                }}>
                Limpar
              </button>
            </div>
          </div>
        </Dropdown.Content>
      </Dropdown.Root>

      {/* <div
        onClick={() => {
          if (!openAdvancedFilter) {
            setOpenAdvancedFilter(!openAdvancedFilter)
          }
        }}
        className={`${
          openAdvancedFilter ? 'text-tertiary' : 'text-secondary'
        } absolute right-2 top-1/2 -translate-y-1/2 transform select-none text-4xl hover:cursor-pointer hover:text-tertiary`}>
        <AiFillCaretDown />
      </div>

      {openAdvancedFilter && (
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
                  onChange={(e) =>
                    setFilterParams({ ...filterParams, [column.id]: e.target.value })
                  }
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
                setOpenAdvancedFilter(!open)
              }}>
              Buscar
            </button>
            <button
              className="rounded-xl bg-secondary p-4 text-white hover:bg-red-500"
              onClick={() => {
                filter({})
                setFilterParams({})
                setOpenAdvancedFilter(!open)
              }}>
              Limpar
            </button>
          </div>
        </div>
      )} */}
    </>
  )
}
