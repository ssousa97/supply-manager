import express, { Request, Response } from 'express'
import { db } from '../database'
import { Contract, ContractSchema } from '../../types/contract'
import { contracts_upsert } from '../database/contracts_upsert'
import { contracts_get } from '../database/contracts_get'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const contracts = await db.manyOrNone<Contract>('select * from "Contract"')
  res.json({
    contracts,
  })
})

contractsRouter.get('/names', async (req: Request, res: Response) => {
  const contractsNames = await db.manyOrNone<Contract>('select name from "Contract"')
  res.json({
    contractsNames,
  })
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const contract = await db.oneOrNone<Contract>(contracts_get, [id])
    res.json({
      status: contract ? 'success' : 'notFound',
      contract,
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as Error).message,
    })
  }
})

contractsRouter.post('/upsert', async (req: Request, res: Response) => {
  try {
    const contract = ContractSchema.parse(req.body.contract)
    await db.any(contracts_upsert, [contract])
    res.json({
      status: 'success',
      message: 'Contrato criado com sucesso!',
    })
  } catch (err) {
    res.json({
      status: 'error',
      message: (err as Error).message,
    })
  }
})

export default contractsRouter
