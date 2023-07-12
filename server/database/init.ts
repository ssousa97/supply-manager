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

export async function setupMigrations() {
  const migrations: string[] = await fs.readdir('./server/database/migrations/')

  try {
    await db.none('CREATE TABLE IF NOT EXISTS migrations (name varchar(255))')
    const appliedMigrations = await db
      .any<string>('SELECT name FROM migrations')
      .then((applied) => applied.map((m: any) => m.name))

    migrations
      .filter((migration) => !appliedMigrations.includes(migration.split('.')[0]))
      .map(async (migration) => {
        const [migrationName] = migration.split('.')
        const query = await fs.readFile('./server/database/migrations/' + migration, { encoding: 'utf-8' })
        await db.none(query)
        await db.none('INSERT INTO migrations (name) VALUES ($<migrationName>)', { migrationName })
      })
  } catch (err) {
    console.log((err as any).msg)
  }
}
