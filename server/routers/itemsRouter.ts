import express, { Request, Response } from 'express'
import { db } from '../database/init'

const itemsRouter = express.Router()

itemsRouter.get('/', async (req: Request, res: Response) => {
  const items = await db.any('select id, code, quantity_on_stock as "quantityOnStock" from item')

  res.json({
    items,
  })
})

itemsRouter.get('/codes', async (req: Request, res: Response) => {
  const codes = await db.any('select code from item')
  res.json({
    codes,
  })
})

itemsRouter.post('/upsert', async (req: Request, res: Response) => {
  const { item } = req.body

  try {
    await db.func('upsert_item', [item])
    res.json({
      status: 'success',
    })
  } catch (err) {
    res.json({
      status: 'failed',
      message: (err as any).message,
    })
  }
})

export default itemsRouter
