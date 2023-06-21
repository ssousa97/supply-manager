import express, { Request, Response } from 'express'
import { createRandomMaterials } from '../utils'

const materialsRouter = express.Router()

materialsRouter.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
  })
  next()
})

materialsRouter.get('/', (req: Request, res: Response) => {
  const materials = createRandomMaterials()
  res.json({
    materials,
  })
})

export default materialsRouter
