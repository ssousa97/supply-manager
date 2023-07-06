import express, { Request, Response } from 'express'
import { db } from '../database/init'

const institutionsRouter = express.Router()

institutionsRouter.get('/', async (req: Request, res: Response) => {
  const institutions = await db.any('select name from institution')

  res.json({ institutions })
})

export default institutionsRouter
