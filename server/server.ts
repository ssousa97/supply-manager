import express, { Request, Response } from 'express'
import itemsRouter from './routers/items'
import ordersRouter from './routers/orders'
import contractsRouter from './routers/contracts'
import dotenv from 'dotenv'
import { setupMigrations } from './database/database'

dotenv.config()

const app = express()

await setupMigrations()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/items', itemsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/contracts', contractsRouter)

app.listen(3000, () => console.log('Server is running'))
