require('dotenv').config()
type sqlConfig = {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
}

const testSql: sqlConfig = {
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  user: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_NAME)
}

const env = process.env.NODE_ENV

let dbConfig = testSql
export default dbConfig