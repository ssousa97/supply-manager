import { FaMinus } from 'react-icons/fa'
import { useTableContext } from './TableContext'

export default function TableRemoveButton() {
  const { table, setTableData, api } = useTableContext()
  return (
    <div className="ml-2 select-none rounded-xl bg-primary p-2 text-white hover:cursor-pointer hover:bg-tertiary">
      <FaMinus
        onClick={() => {
          const selected = table.getSelectedRowModel().rows.at(0)
          if (!selected) return
          setTableData((oldData) => {
            oldData.splice(selected.index, 1)
            return [...oldData]
          })
          fetch(api + '/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selected.original),
          })
        }}
        className="text-3xl"
      />
    </div>
  )
}
