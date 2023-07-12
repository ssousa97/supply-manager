import pgPromise from 'pg-promise'
import * as dotenv from 'dotenv'

dotenv.config()

const dbInitializer = pgPromise()

export const db = dbInitializer({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT ?? '5432'),
  database: process.env.PGDBNAME,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})
