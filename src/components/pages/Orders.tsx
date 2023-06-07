import { useEffect, useState } from 'react'
import TableModel from '../table/TableModel'
import { Model, Order } from '../../../types'
import TableData from '../table/TableData'
import TableControl from '../table/TableControl'
import TableSkeleton from '../table/TableSkeleton'

/**
 * [
    'id',
    'code',
    'checkInDate',
    'portal',
    'daysUntilExpiration',
    'dueDate',
    'institution',
    'tradeNumber',
    'uf',
    'receipt',
    'itemsCategory',
    'shipping',
    'shippingFee',
    'postalCode',
    'status',
    'dispatchDate',
    'deliveryDate',
    'price',
  ]
 * 
 */
const OrdersModel: Model = {
  columns: [
    {
      id: 'id',
      label: 'Id',
      isVisible: true,
    },
    {
      id: 'code',
      label: 'Código',
      isVisible: true,
    },
    {
      id: 'checkInDate',
      label: 'Data de entrada',
      isVisible: true,
    },
    {
      id: 'portal',
      label: 'Portal',
      isVisible: true,
    },
    {
      id: 'daysUntilExpiration',
      label: 'Dias até expirar',
      isVisible: true,
    },
    {
      id: 'dueDate',
      label: 'Data de vencimento',
      isVisible: true,
    },
    {
      id: 'institution',
      label: 'Instituição',
      isVisible: true,
    },
    {
      id: 'tradeNumber',
      label: 'Número do pregão',
      isVisible: true,
    },
    {
      id: 'uf',
      label: 'UF',
      isVisible: true,
    },
    {
      id: 'receipt',
      label: 'Nota fiscal',
      isVisible: true,
    },
    {
      id: 'itemsCategory',
      label: 'Categoria dos itens',
      isVisible: true,
    },
    {
      id: 'shipping',
      label: 'Envio',
      isVisible: true,
    },
    {
      id: 'shippingFee',
      label: 'Taxa de envio',
      isVisible: true,
    },
    {
      id: 'postalCode',
      label: 'CEP',
      isVisible: true,
    },
    {
      id: 'status',
      label: 'Status',
      isVisible: true,
    },
    {
      id: 'dispatchDate',
      label: 'Data de envio',
      isVisible: true,
    },
    {
      id: 'deliveryDate',
      label: 'Data de entrega',
      isVisible: true,
    },
    {
      id: 'price',
      label: 'Preço',
      isVisible: true,
    },
  ],
  data: [],
  viewData: [],
}

export default function Orders() {
  const [ordersModel, setOrdersModel] = useState(OrdersModel)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then((response) => response.json())
      .then(({ orders }) => {
        setOrdersModel({
          data: orders,
          columns: ordersModel.columns,
          viewData: orders,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      <TableModel
        model={ordersModel}
        setModel={setOrdersModel}>
        <TableControl />
        {loading ? <TableSkeleton /> : <TableData />}
      </TableModel>
    </div>
  )
}
