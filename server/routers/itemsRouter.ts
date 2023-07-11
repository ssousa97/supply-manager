import express, { Request, Response } from 'express'
import { db } from '../database/init'
import { ItemSchema } from '../../types/item'
import { item_add_inflow } from '../database/queries/item_add_inflow'
import { item_add_outflow } from '../database/queries/item_add_outflow'

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
  const inflowItem = req.body

  try {
    await db.none(item_add_inflow, [inflowItem.inflow, inflowItem.code])
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
  const outflowItem = req.body

  if (outflowItem.quantityOnStock - outflowItem.outflow < 0) {
    res.json({
      status: 'error',
      message: 'Falha ao adicionar saída. Não há item no estoque !',
    })
    return
  }

  try {
    await db.none(item_add_outflow, [outflowItem.outflow, outflowItem.code])
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
  const item = req.body
  const parseResult = ItemSchema.safeParse(item)

  if (parseResult.success) {
    try {
      await db.func('upsert_item', [item])
      res.json({ status: 'success', message: 'Item salvo com sucesso !' })
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

export default itemsRouter
