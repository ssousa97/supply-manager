import { useEffect, useState } from 'react'
import { IItem } from '../../../types/item'
import toast from 'react-hot-toast'
import { useTableContext } from '../common/table/TableContext'

const newItem: IItem = {
  code: '',
  quantityOnStock: 0,
}

export default function ItemEditDialog() {
  const { table } = useTableContext()
  const [item, setItem] = useState<IItem>(newItem)
  const id = table.getSelectedRowModel().rows[0]?.original.id ?? 'new'

  useEffect(() => {
    if (id === 'new') return
    fetch(`http://localhost:3000/api/items/${id}`)
      .then((res) => res.json())
      .then(({ item }) => setItem(item))
  }, [])

  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-base-200 p-6">
      <div className="flex flex-col">
        <label className="text-white">Código</label>
        <input
          type="text"
          className="input input-sm"
          value={item.code}
          onChange={(e) => setItem({ ...item, code: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-white">Quantidade em estoque</label>
        <input
          type="number"
          min={0}
          className="input input-sm"
          value={item.quantityOnStock}
          onChange={(e) => setItem({ ...item, quantityOnStock: parseInt(e.target.value) })}
        />
      </div>
      <div className="flex justify-center gap-x-2">
        <button
          className="btn-success btn-sm btn"
          onClick={async () => {
            const result = await fetch('http://localhost:3000/api/items/upsert', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(item),
            }).then((res) => res.json())
            if (result.status !== 'success') toast.error(<b>{result.message}</b>, { duration: 5000 })
            else toast.success('Empenho salvo com sucesso')
          }}>
          Salvar
        </button>
        <button className="btn-error btn-sm btn">Cancelar</button>
      </div>
    </div>
  )
}
