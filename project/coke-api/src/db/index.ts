import mysql from 'mysql'
import config from '../config/db-config'

import querySqlStr from './query'
import insertSqlStr from './insert'
import updateSqlStr from './update'
import deleteSqlStr from './delete'

// 创建数据池
const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
})

// 数据库会话操作
export function querySql(sql: querySql) {
  const sqlStr = querySqlStr(sql)
  // console.log('getSqlStr', sqlStr)

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


export function insertSql(sql: insertSql, user = false) {
  const sqlStr = insertSqlStr(sql, user)
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

export function updateSql(sql: updateSql, user = false) {
  const sqlStr = updateSqlStr(sql, user)
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

export function deleteSql(sql: deleteSql, user = false) {
  const sqlStr = deleteSqlStr(sql, user)
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

