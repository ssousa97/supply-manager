import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { useState, useEffect } from 'react'
import Table from '../common/table/Table'
import { OrderSchema, Order } from '../../../types/order'
import OrderActions from './OrderActions'

const columnHelper = createColumnHelper<Order>()
const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('items', {
    header: 'Itens',
    cell: (value) =>
      value
        .getValue()
        .map((item) => item.code)
        .join(', '),
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (value) => <span>R$ {value.getValue().toFixed(2)}</span>,
  }),
  columnHelper.accessor('checkInDate', {
    header: 'Recebido em',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
  }),
  columnHelper.accessor('dueDate', {
    header: 'Vencimento',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
  }),
  columnHelper.accessor('portal', {
    header: 'Portal',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('trade', {
    header: 'Número do pregão',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('receipt', {
    header: 'Nota fiscal',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('categories', {
    header: 'Categorias',
    cell: (value) => value.getValue().join(', '),
  }),
  columnHelper.accessor('shipping', {
    header: 'Entrega',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('shippingFee', {
    header: 'Taxa de entrega',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('postalCode', {
    header: 'Codigo postal',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (value) => (value ? value.getValue() : ''),
  }),
  columnHelper.accessor('dispatchDate', {
    header: 'Data de envio',
    cell: (value) => (value.getValue() ? moment(value.getValue()).format('DD/MM/YYYY') : ''),
  }),
  columnHelper.accessor('deliveryDate', {
    header: 'Data de chegada',
    cell: (value) => (value.getValue() ? moment(value.getValue()).format('DD/MM/YYYY') : ''),
  }),
]

export default function OrdersTable() {
  const api = 'http://localhost:3000/api/orders'
  const [orders, setOrders] = useState<Order[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(({ orders }) => {
        orders = orders.map((order: Order) => {
          const parsedOrder = OrderSchema.safeParse(order)
          if (parsedOrder.success) return parsedOrder.data
        })

        setOrders(orders)
      })
  }, [])

  return (
    <Table
      model="order"
      data={orders}
      setTableData={setOrders}
      columns={columns}
      initialColumnVisibility={{ id: false, code: false }}
      actions={<OrderActions />}
    />
  )
}
