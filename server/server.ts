import express, { Request, Response } from 'express'
import itemsRouter from './routers/items'
import ordersRouter from './routers/orders'
import contractsRouter from './routers/contracts'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 2!',
  })
})

app.use('/api/items', itemsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/contracts', contractsRouter)

app.listen(3000, () => console.log('Server is running'))
