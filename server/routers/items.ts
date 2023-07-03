import express, { Request, Response } from 'express'
import { db } from '../database/init'

const materialsRouter = express.Router()

materialsRouter.get('/', async (req: Request, res: Response) => {
  const items = await db.any('select id, code, quantity_on_stock as "quantityOnStock" from item')

  res.json({
    items,
  })
})

export default materialsRouter
