import { useTableContext } from './TableContext'

export default function TableSkeleton() {
  const { model } = useTableContext()
  return (
    <div className="overflow-auto">
      <table className="w-full bg-accent">
        <thead className="sticky top-0 bg-primary text-white">
          <tr>
            {model.columns.map((column) => (
              <th
                className="rounded-lg border-2 py-2"
                key={column.id as string}>
                <span className="text-center text-xl">{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm"></tbody>
      </table>
    </div>
  )
}
