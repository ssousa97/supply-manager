import { useEffect, useState } from 'react'
import TableModel from '../table/TableModel'
import { Model, Order } from '../../../types'

const OrdersModel: Model<Order> = {
  columns: [
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
  ],
  viewColumns: [],
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
          viewColumns: ordersModel.columns,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      <TableModel
        loading={loading}
        model={ordersModel}
        setModel={setOrdersModel}
      />
    </div>
  )
}
