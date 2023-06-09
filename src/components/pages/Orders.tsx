import { FilterFn, createColumnHelper } from '@tanstack/react-table'
import { Order } from '../../../types'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Table from '../table/Table'

const columnHelper = createColumnHelper<Order>()

const alternativeColumnFilterFn: FilterFn<any> = (row, columnId, value) => {
  const actualValue = String(row.getValue(columnId))
  return actualValue.includes(value)
}

const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('code', {
    header: 'Codigo',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('checkInDate', {
    header: 'Recebido em',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
  }),
  columnHelper.accessor('portal', {
    header: 'Portal',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('daysUntilExpiration', {
    header: 'Expiração',
    cell: (item) => item.getValue(),
    filterFn: alternativeColumnFilterFn,
  }),
  columnHelper.accessor('dueDate', {
    header: 'Vencimento',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('tradeNumber', {
    header: 'Número do pregão',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('receipt', {
    header: 'Nota fiscal',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('itemsCategory', {
    header: 'Categoria',
    cell: (item) => (
      <span onClick={(e) => console.log(item.getValue())}>{item.getValue().join(', ')}</span>
    ),
  }),
  columnHelper.accessor('shipping', {
    header: 'Entrega',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('shippingFee', {
    header: 'Taxa de entrega',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('postalCode', {
    header: 'Codigo postal',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('dispatchDate', {
    header: 'Data de envio',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('deliveryDate', {
    header: 'Data de chegada',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isCreatable: false,
    },
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (item) => item.getValue(),
  }),
]

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders as Order[])
      })
  }, [])

  return (
    <Table
      data={orders}
      setData={setOrders}
      columns={columns}
      initialColumnVisibility={{ id: false, code: false }}
    />
  )
}
