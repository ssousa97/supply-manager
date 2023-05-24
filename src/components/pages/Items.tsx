import { useEffect, useState } from 'react'
import { Item, Model } from '../../../types'
import TableModel from '../table/TableModel'

const ItemsModel: Model<Item> = {
  columns: ['id', 'name', 'uf', 'institution', 'items', 'category', 'price', 'signed', 'due'],
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
        setItemsModel({ ...itemsModel, data: items, viewData: items })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      {/* TODO: Skeleton loader.. */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <TableModel
          model={itemsModel}
          setModel={setItemsModel}
        />
      )}
    </div>
  )
}
