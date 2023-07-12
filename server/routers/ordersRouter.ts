import express, { Request, Response } from 'express'
import { db } from '../database'
import { orders_get_all } from '../database/orders_get_all'
import { Order, OrderSchema } from '../../types/order'
import { orders_get } from '../database/orders_get'
import { orders_upsert } from '../database/orders_upsert'

const ordersRouter = express.Router()

ordersRouter.get('/', async (req: Request, res: Response) => {
  const orders = await db.manyOrNone(orders_get_all)
  res.json({
    orders,
  })
})

ordersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const order = await db.oneOrNone<Order>(orders_get, [id])
    res.json({
      status: order ? 'success' : 'notFound',
      order,
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as Error).message,
    })
  }
})

ordersRouter.post('/upsert', async (req: Request, res: Response) => {
  try {
    const order = OrderSchema.parse(req.body.order)
    await db.any(orders_upsert, [order])
    res.json({
      status: 'success',
      message: 'Empenho salvo com sucesso!',
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as Error).message,
    })
  }
})

ordersRouter.post('/dispatch-order', async (req: Request, res: Response) => {})

export default ordersRouter
