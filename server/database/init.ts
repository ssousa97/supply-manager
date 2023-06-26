import pgPromise from 'pg-promise'
import fs from 'fs/promises'

const dbInitializer = pgPromise()

export const db = dbInitializer({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT ?? '5432'),
  database: process.env.PGDBNAME,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

export async function setup() {
  const migrations: string[] = await fs.readdir('./server/migrations/')

  try {
    await db.none('CREATE TABLE IF NOT EXISTS migrations (name varchar(255))')
    const appliedMigrations = await db.manyOrNone<string>(
      'SELECT name FROM migrations'
    )
    migrations
      .filter((migration) => !appliedMigrations.includes(migration))
      .map(async (migration) => {
        const [migrationName] = migration.split('.')
        const query = await fs.readFile('./server/migrations/' + migration, {
          encoding: 'utf-8',
        })
        await db.none(query)
      })
  } catch (err) {
    console.log(err)
  }
}
