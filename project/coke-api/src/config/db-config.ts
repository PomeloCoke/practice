type sqlConfig = {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
}

const testSql: sqlConfig = {
  host: '119.45.60.225',
  port: 2119,
  user: 'coke',
  password: 'lytz+01@19!lovey',
  database: 'test'
}

const env = process.env.NODE_ENV

let dbConfig = testSql
export default dbConfig