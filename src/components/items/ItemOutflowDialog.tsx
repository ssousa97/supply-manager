import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTableContext } from '../common/table/TableContext'

export function ItemOutflowDialog() {
  const [outflow, setOutflow] = useState(0)
  const { table } = useTableContext()
  const { code, quantityOnStock } = table.getSelectedRowModel().rows[0].original

  const addOutflow = async () => {
    const result = await fetch('http://localhost:3000/api/items/outflow', {
      method: 'POST',
      body: JSON.stringify({
        code,
        outflow,
        quantityOnStock,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    if (result.status === 'success') toast.success(result.message)
    else toast.error(result.message)
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-base-200 p-12">
      <label className="mb-4">Saída do item {code} </label>
      <input
        type="number"
        className="input input-sm"
        min={0}
        value={outflow}
        onChange={(e) => setOutflow(parseInt(e.target.value))}
      />
      <button
        className="btn-success btn-sm btn mt-6 w-fit self-center"
        onClick={addOutflow}>
        Adicionar
      </button>
    </div>
  )
}
