import express, { Request, Response } from 'express'
import { db } from '../database/init'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const contracts = await db.any(
    `
    SELECT 
      c.id, c.name, c.signed_date, c.due_date, c.total_price,
    `
  )
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {})

contractsRouter.post('/create', async (req: Request, res: Response) => {})

contractsRouter.post('/update', async (req: Request, res: Response) => {})

contractsRouter.post('/delete', async (req: Request, res: Response) => {})

export default contractsRouter
