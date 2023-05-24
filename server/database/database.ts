import dotenv from 'dotenv'

dotenv.config()
import pg from 'pg'

const pool = new pg.Pool()

const res = await pool.query('SELECT NOW()')
await pool.end()

console.log(res.rows[0].now as Date)
