import express, { Request, Response } from 'express'
import materialsRouter from './routers/materials'
import ordersRouter from './routers/orders'
import contractsRouter from './routers/contracts'
import dotenv from 'dotenv'
import { setupMigrations, loadQueries } from './database/init'

dotenv.config()

const app = express()

await setupMigrations()
await loadQueries()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  res.header({ 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT' })
  res.header({ 'Access-Control-Allow-Headers': 'Content-Type' })

  next()
})
app.use('/api/contracts', contractsRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/orders', ordersRouter)
app.get('/api/institutions', async (req: Request, res: Response) => {})
app.listen(3000, () => console.log('Server is running'))
