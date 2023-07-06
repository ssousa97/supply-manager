import express, { Request, Response } from 'express'
import { db } from '../database/init'

const categoriesRouter = express.Router()

categoriesRouter.get('/', async (req: Request, res: Response) => {
  const categories = await db.any('select name from category')
  res.json({ categories })
})

export default categoriesRouter
