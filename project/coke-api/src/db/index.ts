import mysql from 'mysql'
import config from '../config/db-config'

import querySqlStr from './query'


// 创建数据池
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

// 数据库会话操作
export function querySql(sql: querySql) {
  const sqlStr = querySqlStr(sql)
  console.log('getSqlStr', sqlStr)

  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sqlStr, (error, res) => {
          if (error) reject(error)
          else {
            const newRes = JSON.parse(JSON.stringify(res))
            resolve(newRes)
          }
          connection.release()
        })
      }

    })
  })
}

