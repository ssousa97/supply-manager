import { FilterFn, createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Order } from '../../../../@types'
import Table from '../../table/Table'

const columnHelper = createColumnHelper<Order>()

const numberColumnFilter: FilterFn<any> = (row, columnId, value) => {
  const actualValue = String(row.getValue(columnId))
  return actualValue.includes(value)
}

const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('code', {
    header: 'Codigo',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('checkInDate', {
    header: 'Recebido em',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('portal', {
    header: 'Portal',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('daysUntilExpiration', {
    header: 'Expiração',
    cell: (item) => item.getValue(),
    filterFn: numberColumnFilter,
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('dueDate', {
    header: 'Vencimento',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('tradeNumber', {
    header: 'Número do pregão',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('receipt', {
    header: 'Nota fiscal',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: false,
      isEditable: true,
    },
  }),
  columnHelper.accessor('itemsCategory', {
    header: 'Categoria',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('shipping', {
    header: 'Entrega',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('shippingFee', {
    header: 'Taxa de entrega',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
  }),
  columnHelper.accessor('postalCode', {
    header: 'Codigo postal',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
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
      isEditable: true,
    },
  }),
  columnHelper.accessor('deliveryDate', {
    header: 'Data de chegada',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isCreatable: false,
      isEditable: true,
    },
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (item) => item.getValue(),
    meta: {
      isCreatable: true,
      isEditable: true,
    },
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
      model="orders"
      data={orders}
      setTableData={setOrders}
      columns={columns}
      api="http://localhost:3000/api/orders"
      initialColumnVisibility={{ id: false, code: false }}
    />
  )
}
