import express, { Request, Response } from 'express'

const contractsRouter = express.Router()

contractsRouter.get('/', async (req: Request, res: Response) => {})

contractsRouter.get('/:id', async (req: Request, res: Response) => {})

contractsRouter.post('/create', async (req: Request, res: Response) => {})

contractsRouter.post('/update', async (req: Request, res: Response) => {})

contractsRouter.post('/delete', async (req: Request, res: Response) => {})

export default contractsRouter
