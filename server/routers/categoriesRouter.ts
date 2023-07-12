import express, { Request, Response } from 'express'

const categoriesRouter = express.Router()

categoriesRouter.get('/', async (req: Request, res: Response) => {})

export default categoriesRouter
