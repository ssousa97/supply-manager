import express, { Request, Response } from 'express'
import { db, queries } from '../database/init'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const contracts = await db.any(queries.contracts_get_all)
  res.json({ contracts })
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const contract = await db.oneOrNone(queries.contracts_get, [id])
  res.json({ contract })
})

contractsRouter.post('/upsert', async (req: Request, res: Response) => {
  const { contract } = req.body

  try {
    await db.func('upsert_contract', [contract])
    res.json({ status: 'success' })
  } catch (err) {
    res.json({
      status: 'failed',
      message: (err as any).message,
    })
  }
})

contractsRouter.post('/delete', async (req: Request, res: Response) => {})

export default contractsRouter
