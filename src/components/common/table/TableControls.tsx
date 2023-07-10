import TableColumnSelector from './TableColumnSelector'
import { useTableContext } from './TableContext'
import TableFilter from './TableFilter'

export default function TableControls() {
  const { actions } = useTableContext()
  return (
    <div className="flex w-full items-center px-10">
      <TableFilter />
      <div className="ml-4 flex gap-2">
        <TableColumnSelector />
        {actions}
      </div>
    </div>
  )
}
