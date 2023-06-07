import TableAdvancedFilter from './TableAdvancedFilter'
import TableColumnFilter from './TableColumnFilter'
import TableActionButton from './TableActionButton'
import TableFilter from './TableFilter'
import TableEditDialog from './TableEditDialog'

export default function TableControl() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative w-[50%]">
        <TableFilter />
        <TableAdvancedFilter />
      </div>
      <TableColumnFilter />
      <TableEditDialog editType="add">
        <TableActionButton action="add" />
      </TableEditDialog>
      <TableActionButton action="remove" />
      <TableActionButton action="edit" />
    </div>
  )
}
