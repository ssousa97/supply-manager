import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useTableContext } from './TableContext'

type TableEditButtonProps = {
  type: 'add' | 'edit' | 'remove'
}
export default function TableEditButton({ type }: TableEditButtonProps) {
  const { table, model } = useTableContext()
  if (type === 'add') {
    return (
      <NavLink to={`/${model}/new`}>
        <button className="btn text-xl">
          <FaPlus />
        </button>
      </NavLink>
    )
  }
  if (type === 'edit') {
    const selected = table.getSelectedRowModel().rows[0]?.original
    return selected ? (
      <NavLink to={`/${model}/${selected.id}`}>
        <button className="btn text-xl">
          <FaEdit />
        </button>
      </NavLink>
    ) : (
      <button
        className="btn text-xl"
        disabled>
        <FaEdit />
      </button>
    )
  }
  if (type === 'remove') {
    return (
      <button className="btn text-xl">
        <FaMinus />
      </button>
    )
  }
}
