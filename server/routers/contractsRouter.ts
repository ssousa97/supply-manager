import express, { Request, Response } from 'express'
import { db, queries } from '../database/init'
import { ContractSchema, IContract } from '../../types/contract'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const contracts = await db.any(queries.contracts_get_all)
  res.json({ contracts })
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const contract = await db.oneOrNone<IContract>(queries.contracts_get, [id])
  res.json({ contract })
})

contractsRouter.post('/upsert', async (req: Request, res: Response) => {
  const contract = req.body
  const parseResult = ContractSchema.safeParse(contract)

  if (parseResult.success) {
    try {
      await db.func('upsert_contract', [contract])
      res.json({ status: 'success', message: 'Contrato salvo com sucesso !' })
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

export default contractsRouter
