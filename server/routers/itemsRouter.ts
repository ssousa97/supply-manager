import express, { Request, Response } from 'express'

const itemsRouter = express.Router()

itemsRouter.get('/', async (req: Request, res: Response) => {})

itemsRouter.get('/codes', async (req: Request, res: Response) => {})

itemsRouter.get('/:id', async (req: Request, res: Response) => {})

itemsRouter.post('/inflow', async (req: Request, res: Response) => {})

itemsRouter.post('/outflow', async (req: Request, res: Response) => {})

itemsRouter.post('/upsert', async (req: Request, res: Response) => {})

export default itemsRouter
