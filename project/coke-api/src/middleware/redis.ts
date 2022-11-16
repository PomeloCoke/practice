import redis from 'ioredis'
import config from '../config/redis-config'

const redisPool = new redis({
  host: config.host,
  port: config.port,
  // password: config.password
})

export default redisPool