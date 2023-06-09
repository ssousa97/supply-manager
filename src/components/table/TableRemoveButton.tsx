import { FaMinus } from 'react-icons/fa'
import { useTableContext } from './TableContext'

export default function TableRemoveButton() {
  const { table, setData } = useTableContext()
  return (
    <div className="ml-2 select-none rounded-xl bg-primary p-2 text-white hover:cursor-pointer hover:bg-tertiary">
      <FaMinus
        onClick={() => {
          const selected = table.getSelectedRowModel().rows.at(0)
          if (!selected) return
          setData((oldData) => {
            oldData.splice(selected.index, 1)
            return [...oldData]
          })
        }}
        className="text-3xl"
      />
    </div>
  )
}
