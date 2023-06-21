import { useTableContext } from './TableContext'

export default function TableGlobalFilter() {
  const { globalFilter, setGlobalFilter } = useTableContext()
  return (
    <input
      type="text"
      className="w-full rounded-lg p-2"
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
    />
  )
}
