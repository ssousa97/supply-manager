import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import Table from '../common/table/Table'
import { Item } from '../../../types/item'
import ItemActions from './ItemActions'

const columnHelper = createColumnHelper<Item>()
const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('code', {
    header: 'Código',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('quantityOnStock', {
    header: 'Quantidade em estoque',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  // columnHelper.accessor('totalRequestedAmountOnCurrentMonth', {
  //   header: 'Quantidade solicitada para o mês atual',
  //   cell: (value) => <span>{value.getValue()}</span>,
  // }),
  // columnHelper.accessor('totalRequestedAmountAllTime', {
  //   header: 'Quantidade solicitada ao todo',
  //   cell: (value) => <span>{value.getValue()}</span>,
  // }),
]

export default function ItemsTable() {
  const api = 'http://localhost:3000/api/items'
  const [items, setItems] = useState<Item[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(({ items }) => setItems(items as Item[]))
  }, [])

  return (
    <Table
      model="item"
      data={items}
      setTableData={setItems}
      columns={columns}
      initialColumnVisibility={{ id: false }}
      actions={<ItemActions />}
    />
  )
}
