import express, { Request, Response } from 'express'
import { db, queries } from '../database/init'

const ordersRouter = express.Router()

ordersRouter.get('/', async (req: Request, res: Response) => {
  const orders = await db.any(queries.orders_get_all)
  res.json({ orders })
})

ordersRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await db.oneOrNone(queries.orders_get, [id])
  res.json({ order })
})

ordersRouter.post('/upsert', async (req: Request, res: Response) => {
  const { order } = req.body

  try {
    await db.func('upsert_order', [order])
    res.json({ status: 'success' })
  } catch (err) {
    res.json({
      status: 'failed',
      message: (err as any)?.message,
    })
  }
})

export default ordersRouter
