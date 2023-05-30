import { useEffect, useState } from 'react'
import { Model } from '../../../types'
import TableModel from '../table/TableModel'
import TableFilter from '../table/TableFilter'
import TableData from '../table/TableData'
import TableSkeleton from '../table/TableSkeleton'
import TableAdvancedFilter from '../table/TableAdvancedFilter'
import TableColumnFilter from '../table/TableColumnFilter'

const ItemsModel: Model = {
  columns: [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'name',
      label: 'Nome',
    },
    {
      id: 'uf',
      label: 'UF',
    },
    {
      id: 'institution',
      label: 'Instituição',
    },
    {
      id: 'items',
      label: 'Itens',
    },
    {
      id: 'category',
      label: 'Categoria',
    },
    {
      id: 'price',
      label: 'Preço',
    },
    {
      id: 'signed',
      label: 'Assinado',
    },
    {
      id: 'due',
      label: 'Vencimento',
    },
  ],
  data: [],
  viewData: [],
}

export default function Items() {
  const [itemsModel, setItemsModel] = useState(ItemsModel)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then((response) => response.json())
      .then(({ items }) => {
        setItemsModel({
          data: items,
          columns: itemsModel.columns,
          viewData: items,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      <TableModel
        model={itemsModel}
        setModel={setItemsModel}>
        <TableFilter />
        {loading ? <TableSkeleton /> : <TableData />}
      </TableModel>
    </div>
  )
}
