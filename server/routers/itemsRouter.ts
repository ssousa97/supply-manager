import express, { Request, Response } from 'express'
import { db } from '../database/init'
import { InflowSchema, ItemSchema, OutflowSchema } from '../../types/item'
import { items_add_inflow } from '../database/queries/items_add_inflow'
import { items_add_outflow } from '../database/queries/items_add_outflow'

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

itemsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const item = await db.one('select id, code, quantity_on_stock as "quantityOnStock" from item where id = $1', [id])

  res.json({
    item,
  })
})

itemsRouter.post('/inflow', async (req: Request, res: Response) => {
  const parseResult = InflowSchema.safeParse(req.body)

  if (!parseResult.success) {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
    return
  }

  const inflowItem = parseResult.data
  try {
    await db.none(items_add_inflow, inflowItem)
    res.json({
      status: 'success',
      message: 'Entrada de item salva com sucesso',
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as any).message,
    })
  }
})

itemsRouter.post('/outflow', async (req: Request, res: Response) => {
  const parseResult = OutflowSchema.safeParse(req.body)

  if (!parseResult.success) {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
    return
  }

  const outflowItem = parseResult.data
  if (outflowItem.currentQuantity - outflowItem.outflowQuantity < 0) {
    res.json({
      status: 'error',
      message: 'Falha ao adicionar saída. Não há item no estoque !',
    })
    return
  }

  try {
    await db.none(items_add_outflow, outflowItem)
    res.json({
      status: 'success',
      message: 'Saída de item salva com sucesso',
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as any).message,
    })
  }
})

itemsRouter.post('/upsert', async (req: Request, res: Response) => {
  const parseResult = ItemSchema.safeParse(req.body)

  if (!parseResult.success) {
    res.json({
      status: 'error',
      message: parseResult.error.issues.map((issue) => `${issue.path[0]} - ${issue.message}`).join('\n'),
    })
    return
  }

  const item = parseResult.data
  try {
    await db.func('upsert_item', [item])
    res.json({ status: 'success', message: 'Item salvo com sucesso !' })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as any).message,
    })
  }
})

export default itemsRouter
