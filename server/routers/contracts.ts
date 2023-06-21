import express, { Request, Response } from 'express'
import { Contract } from '../../@types'
import { query } from '../database/database'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {
  const result = await query<Contract>(`SELECT * FROM contract`)
  res.json(result)
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  const result = await query<Contract>(`SELECT * FROM contract WHERE id = $1`, [req.params.id])
  res.json(result)
})

contractsRouter.post('/create', async (req: Request, res: Response) => {
  // await transaction(`

  //   INSERT INTO contract (id, name, institution_id, total_price, due, signed_at)
  //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  // `)
  console.log('creating...', req.body)
})

contractsRouter.post('/update', async (req: Request, res: Response) => {
  console.log('updating...', req.body)
})

contractsRouter.post('/delete', async (req: Request, res: Response) => {
  console.log('deleting...', req.body)
})

export default contractsRouter
