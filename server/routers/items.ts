import express, { Request, Response } from 'express'
import { createRandomItems } from '../utils'

const itemsRouter = express.Router()

itemsRouter.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
  })
  next()
})

itemsRouter.get('/', (req: Request, res: Response) => {
  const items = createRandomItems()
  res.json({
    items,
  })
})

export default itemsRouter
