import { FaArrowDown, FaArrowUp, FaEdit, FaPlus } from 'react-icons/fa'
import ItemEditDialog from './ItemEditDialog'
import Dialog from '../common/Dialog'
import { ItemInflowDialog } from './ItemInflowDialog'
import { ItemOutflowDialog } from './ItemOutflowDialog'
import { useTableContext } from '../common/table/TableContext'

export default function ItemActions() {
  const { table } = useTableContext()
  const hasSelected = table.getSelectedRowModel().rows.length > 0

  return (
    <>
      <Dialog
        trigger={
          <div
            className="tooltip"
            data-tip="Editar item">
            <button className="btn text-xl">{hasSelected ? <FaEdit /> : <FaPlus />}</button>
          </div>
        }
        content={<ItemEditDialog />}
      />
      <Dialog
        trigger={
          <div
            className="tooltip"
            data-tip="Adicionar entrada">
            <button
              className="btn text-xl"
              disabled={!hasSelected}>
              <FaArrowDown />
            </button>
          </div>
        }
        content={<ItemInflowDialog />}
      />
      <Dialog
        trigger={
          <div
            className="tooltip"
            data-tip="Adicionar saída">
            <button
              className="btn text-xl"
              disabled={!hasSelected}>
              <FaArrowUp />
            </button>
          </div>
        }
        content={<ItemOutflowDialog />}
      />
    </>
  )
}
