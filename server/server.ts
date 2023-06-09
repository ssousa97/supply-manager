import express from 'express'
import itemsRouter from './routers/itemsRouter'
import ordersRouter from './routers/ordersRouter'
import contractsRouter from './routers/contractsRouter'
import institutionsRouter from './routers/institutionsRouter'
import categoriesRouter from './routers/categoriesRouter'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  res.header({ 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST, PUT' })
  res.header({ 'Access-Control-Allow-Headers': 'Content-Type' })

  next()
})
app.use('/api/contracts', contractsRouter)
app.use('/api/items', itemsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/institutions', institutionsRouter)
app.use('/api/categories', categoriesRouter)

app.listen(3000, () => console.log('Server is running'))
