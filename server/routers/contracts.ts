import express, { Request, Response } from 'express'
import { Contract } from '../../types'
import { query } from '../database/database'

const contractsRouter = express.Router()

contractsRouter.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  res.header({ 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT' })
  res.header({ 'Access-Control-Allow-Headers': 'Content-Type' })

  next()
})

contractsRouter.get('/', async (req: Request, res: Response) => {
  const result = await query<Contract>(`SELECT * FROM contract`)
  res.json(result)
})

contractsRouter.get('/:id', async (req: Request, res: Response) => {
  const result = await query<Contract>(`SELECT * FROM contract WHERE id = $1`, [req.params.id])
  res.json(result)
})

contractsRouter.post('/create', (req: Request, res: Response) => {
  console.log('creating...', req.body)
})

contractsRouter.post('/update', (req: Request, res: Response) => {
  console.log('updating...', req.body)
})

contractsRouter.post('/delete', (req: Request, res: Response) => {
  console.log('deleting...', req.body)
})

export default contractsRouter
