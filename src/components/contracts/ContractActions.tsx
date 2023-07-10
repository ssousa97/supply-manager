import { FaEdit, FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useTableContext } from '../common/table/TableContext'

export default function ContractActions() {
  const { table } = useTableContext()
  const selected = table.getSelectedRowModel().rows[0]?.original

  return (
    <>
      <NavLink to={`/contract/new`}>
        <button className="btn text-xl">
          <FaPlus />
        </button>
      </NavLink>
      {selected ? (
        <NavLink to={`/contract/${selected.id}`}>
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
