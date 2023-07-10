import express, { Request, Response } from 'express'
import { db } from '../database/init'
import { contracts_get_all } from '../database/queries/contracts_get_all'
import { ContractSchema, IContract } from '../../types/contract'
import { contracts_get } from '../database/queries/contracts_get'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const contracts = await db.any(contracts_get_all)
  res.json({ contracts })
})

contractsRouter.get('/names', async (req: Request, res: Response) => {
  const contractNames = await db.manyOrNone<string>('select name from contract')
  res.json({ contractNames })
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const contract = await db.oneOrNone<IContract>(contracts_get, [id])
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
