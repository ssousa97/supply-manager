/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs'
import dotenv from 'dotenv'
import pg from 'pg'
import { Migrations } from '../utils'

dotenv.config()

const pool = new pg.Pool()

export async function query<Expects>(query: string, params?: string[]): Promise<Expects[] | undefined> {
  const client: pg.PoolClient = await pool.connect()
  try {
    return (await client.query(query, params))?.rows as Expects[]
  } catch (err: any) {
    console.error(err)
  } finally {
    client.release()
  }
}

export async function execute(query: string, params?: string[]): Promise<boolean> {
  const client: pg.PoolClient = await pool.connect()
  try {
    await client.query(query, params)
    return true
  } catch (err: any) {
    console.error(err)
    return false
  } finally {
    client.release()
  }
}

export async function transaction<Expects>(query: string, params?: string[]): Promise<Expects[] | undefined> {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const result: Expects[] = (await client.query(query, params))?.rows
    await client.query('COMMIT')
    return result
  } catch (err: any) {
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}

export async function setupMigrations() {
  if (!process.env.MIGRATIONS_PATH) {
    throw new Error('MIGRATIONS_PATH not set')
  }
  const files = await new Promise<string[]>((resolve, reject) =>
    fs.readdir(process.env.MIGRATIONS_PATH!, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  )

  if (
    !(await execute(`
    create table if not exists migrations(
      id serial primary key,
      timestamp bigint unique,
      name varchar(250)
    )
  `))
  ) {
    throw new Error('Failed to create migrations table')
  }

  const migrations = await query<Pick<Migrations, 'timestamp'>>('select timestamp from migrations')

  files
    .filter((file) => !migrations!.find((m) => m.timestamp === file.split('.')[0]))
    .forEach(async (file) => {
      try {
        const queryString = await new Promise<string>((resolve, reject) =>
          fs.readFile(`${process.env.MIGRATIONS_PATH}/${file}`, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
          })
        )
        const [timestamp, fileName] = file.split('.')
        if (!(await execute(queryString))) {
          console.log(`Migration ${fileName} failed`)
          return
        }
        await execute(`insert into migrations (timestamp, name) values ($1, $2)`, [timestamp, fileName])
      } catch (err) {
        console.error(err)
      }
    })
}
