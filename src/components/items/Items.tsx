import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import Table from '../common/table/Table'
import { IItem } from '../../../types/item'

const columnHelper = createColumnHelper<IItem>()
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
]

export default function Items() {
  const api = 'http://localhost:3000/api/items'
  const [items, setItems] = useState<IItem[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(({ items }) => setItems(items as IItem[]))
  }, [])

  return (
    <Table
      model="item"
      data={items}
      setTableData={setItems}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
