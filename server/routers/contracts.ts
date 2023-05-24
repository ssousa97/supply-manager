import express, { Request, Response } from 'express'
import { createRandomContracts } from '../utils'

const contractsRouter = express.Router()

contractsRouter.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
  })
  next()
})

contractsRouter.get('/', (req: Request, res: Response) => {
  const contracts = createRandomContracts()

  res.json({
    contracts,
  })
})

export default contractsRouter
