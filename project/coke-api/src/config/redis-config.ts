type sqlConfig = {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
}

const testSql: sqlConfig = {
  host: '119.45.60.225',
  port: 6579,
  user: 'coke',
  password: 'lytz0119',
  database: 'test'
}

const env = process.env.NODE_ENV

let redisConfig = testSql
export default redisConfig