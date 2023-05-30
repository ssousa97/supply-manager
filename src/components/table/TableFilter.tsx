import { useRef, useState } from 'react'
import { debounce } from 'lodash'
import { AiFillCaretDown } from 'react-icons/ai'
import TableAdvancedFilter from './TableAdvancedFilter'
import TableColumnFilter from './TableColumnFilter'
import { useTableContext } from './TableContext'

export default function TableFilter() {
  const { model, setModel } = useTableContext()
  const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false)

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
    <div className="flex items-center gap-x-2">
      <div className="relative w-[50%]">
        <input
          type="text"
          className="w-full rounded-lg p-2 text-xl"
          onChange={(e) => debounceFilter(e.target.value)}
        />
        <AiFillCaretDown
          onClick={() => setOpenAdvancedFilter(!openAdvancedFilter)}
          className={`${
            openAdvancedFilter ? 'text-tertiary' : 'text-secondary'
          } absolute right-2 top-1/2 -translate-y-1/2 transform text-4xl hover:cursor-pointer hover:text-tertiary `}
        />
        {/*TODO: Improve this */}
        {openAdvancedFilter && <TableAdvancedFilter setOpen={setOpenAdvancedFilter} />}
      </div>
      <TableColumnFilter />
    </div>
  )
}
