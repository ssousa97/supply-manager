import TableColumnSelector from './TableColumnSelector'
import TableEditButton from './TableEditButton'
import TableFilter from './TableFilter'
import TableUploadButton from './TableUploadButton'

export default function TableControls() {
  return (
    <div className="flex w-full items-center px-10">
      <TableFilter />
      <div className="ml-4 flex gap-2">
        <TableColumnSelector />
        <TableEditButton type="add" />
        <TableEditButton type="edit" />
        <TableEditButton type="remove" />
        <TableUploadButton />
      </div>
    </div>
  )
}
