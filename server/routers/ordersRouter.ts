import express, { Request, Response } from 'express'
import { db } from '../database/init'
import { orders_get_all } from '../database/queries/orders_get_all'
import { orders_get } from '../database/queries/orders_get'
import { DispatchOrderSchema, OrderSchema } from '../../types/order'
import { orders_dispatch_order } from '../database/queries/orders_dispatch_order'
import { items_add_outflow } from '../database/queries/items_add_outflow'

const ordersRouter = express.Router()

ordersRouter.get('/', async (req: Request, res: Response) => {
  const orders = await db.any(orders_get_all)
  res.json({ orders })
})

ordersRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await db.oneOrNone(orders_get, [id])
  res.json({ order })
})

ordersRouter.post('/upsert', async (req: Request, res: Response) => {
  const parseResult = OrderSchema.safeParse(req.body)

  if (!parseResult.success) {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
    return
  }

  const order = parseResult.data
  try {
    await db.func('upsert_order', [order])
    res.json({ status: 'success', message: 'Empenho salvo com sucesso !' })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as any).message,
    })
  }
})

ordersRouter.post('/dispatch-order', async (req: Request, res: Response) => {
  const parseResult = DispatchOrderSchema.safeParse(req.body)

  if (!parseResult.success) {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
    return
  }

  const dispatchOrder = parseResult.data
  try {
    await db.tx(async (t) => {
      await t.none(orders_dispatch_order, dispatchOrder)
      dispatchOrder.outflowItems.forEach(
        async (item) =>
          await t.none(items_add_outflow, {
            ...item,
            orderId: dispatchOrder.id,
          })
      )
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as any).message,
    })
  }

  res.json({
    status: 'success',
    messages: 'Ordem despachada.',
  })
})

export default ordersRouter
