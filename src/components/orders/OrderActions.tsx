import { FaPlus, FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useTableContext } from '../common/table/TableContext'

export default function OrderActions() {
  const { table } = useTableContext()
  const selected = table.getSelectedRowModel().rows[0]?.original
  return (
    <>
      <NavLink to={`/order/new`}>
        <button className="btn text-xl">
          <FaPlus />
        </button>
      </NavLink>
      {selected ? (
        <NavLink to={`/order/${selected.id}`}>
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
      )}
    </>
  )
}
