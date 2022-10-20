import mysql from 'mysql'
import config from '../config/db-config'
import { typeData } from '../utils'

// 创建数据池
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

function createSqlStr(sql:querySql):string {
  type keyType = keyof typeof sql
  let str:string[] = []

  Object.keys(sql).map((key) => {
    const sqlKey = key.toUpperCase()
    const sqlVal = sql[key as keyType]
    let sqlItem = `${sqlKey}`
    
    if (typeData(sqlVal, 'Array')) {
      
    } else {
      sqlItem+= ` ${sqlVal}`
    }
    str.push(sqlItem)
  })
  return str.join(' ') + ';'
}

// 数据库会话操作
export function querySql(sql:querySql) {
  const sqlStr = createSqlStr(sql)
  console.log('getSqlStr', sqlStr)

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sqlStr, (error, res) => {
          if(error) reject(error)
          else resolve(res)
          connection.release()
        })
      }
      
    })
  })
}

