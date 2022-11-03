import mysql from 'mysql'
import config from '../config/db-config'

import { SqlVal as ValEnum } from '../enum/sql'
import {
  select as ValSelectType,
  where as ValWhereType,
  orderBy as ValOrderByType,
  sqlValType as ValType
} from '../types/sql'
import { typeData } from '../utils'

// 创建数据池
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

function createSqlStr(sql: querySql): string {
  type keyType = keyof typeof sql
  let str: string[] = []

  Object.keys(sql).map((key) => {
    const sqlKey = key.toUpperCase()
    const sqlVal = sql[key as keyType]
    let sqlItem = `${sqlKey}`
    
    if (typeData(sqlVal, 'Array')) {
      sqlItem+= ` ${joinSqlVal(sqlVal,sqlKey)}`
    } else {
      sqlItem += ` ${sqlVal}`
    }
    str.push(sqlItem)
  })
  return str.join(' ') + ';'
}

function joinSqlVal(valList: any, type: string): string {
  let valStr = [] as string[]
  switch (type) {
    case ValEnum.SELECT:
      valList.map((item: ValSelectType) => {
        let valItem = item.name
        if (item.alias) valItem+= ` AS ${item.alias}`
        valStr.push(valItem)
      })
      break
  }
  console.log('getSqlVal---',valStr, type)
  return `${valStr.join(',')}`
}

// 数据库会话操作
export function querySql(sql: querySql) {
  const sqlStr = createSqlStr(sql)
  console.log('getSqlStr', sqlStr)

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sqlStr, (error, res) => {
          if (error) reject(error)
          else resolve(res)
          connection.release()
        })
      }

    })
  })
}

