import { useState } from 'react'
import { useTableContext } from '../common/table/TableContext'
import { toast } from 'react-hot-toast'

export function ItemInflowDialog() {
  const [inflow, setInflow] = useState(0)
  const { table } = useTableContext()
  const code = table.getSelectedRowModel().rows[0].original.code

  const addInflow = async () => {
    const result = await fetch('http://localhost:3000/api/items/inflow', {
      method: 'POST',
      body: JSON.stringify({
        code,
        inflow,
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
      <label className="mb-4">Entrada do item {code} </label>
      <input
        type="number"
        className="input input-sm"
        min={0}
        value={inflow}
        onChange={(e) => setInflow(parseInt(e.target.value))}
      />
      <button
        className="btn-success btn-sm btn mt-6 w-fit self-center"
        onClick={addInflow}>
        Adicionar
      </button>
    </div>
  )
}
