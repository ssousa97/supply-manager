import express, { Request, Response } from 'express'
import { createRandomOrders } from '../utils'

const ordersRouter = express.Router()

ordersRouter.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
  })
  next()
})

ordersRouter.get('/', (req: Request, res: Response) => {
  const orders = createRandomOrders(20)

  res.json({
    orders,
  })
})

export default ordersRouter
