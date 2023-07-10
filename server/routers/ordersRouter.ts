import express, { Request, Response } from 'express'
import { db } from '../database/init'
import { orders_get_all } from '../database/queries/orders_get_all'
import { orders_get } from '../database/queries/orders_get'
import { OrderSchema } from '../../types/order'

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
  const order = req.body
  const parseResult = OrderSchema.safeParse(order)

  if (parseResult.success) {
    try {
      await db.func('upsert_order', [order])
      res.json({ status: 'success', message: 'Empenho salvo com sucesso !' })
    } catch (err) {
      res.json({
        status: 'error',
        message: (err as any).message,
      })
    }
  } else {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
  }
})

export default ordersRouter
