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
    let sqlItem = `${sqlKey.split('_').join(' ')}`
    
    if (typeData(sqlVal, 'Array')) {
      sqlItem+= ` ${joinSqlValArr(sqlVal,sqlKey)}`
    } else if (typeData(sqlVal, 'Object')) {
      sqlItem+= ` ${joinSqlValObj(sqlVal,sqlKey)}`
    } else {
      sqlItem += ` ${sqlVal}`
    }
    str.push(sqlItem)
  })
  return str.join(' ') + ';'
}

function joinSqlValArr(valList: any, type: string): string {
  let valStr = [] as string[]
  let sqlStr = ''
  switch (type) {
    case ValEnum.SELECT:
      valList.map((item: ValSelectType) => {
        let valItem = item.name
        if (item.name === 'create_time' || item.name === 'edit_time') {
          valItem = `DATE_FORMAT(${item.name}, '%Y-%m-%d') AS ${item.name}`
        }
        if (item.alias) valItem+= ` AS ${item.alias}`
        valStr.push(valItem)
      })
      sqlStr = valStr.join(',')
      break
    case ValEnum.WHERE:
      valList.map((item: ValWhereType, idx: number) => {
        if (Array.isArray(item.name)) {
          let childVal = [] as ValWhereType[]
          item.name.map((child:string, idx2: number)=> {
            childVal.push({
              name: child,
              opt: item.opt,
              val: item.val,
              join: item.join ? item.join[idx2] : "AND"
            })
          })
          sqlStr+=`(${joinSqlValArr(childVal,type)})`
          if (idx < valList.length - 1) {
            sqlStr+=`${item.join ? item.join[item.join.length-1] : 'AND'} `
          } 
        } else {
          let valItem = item.name
          if (item.opt) valItem+= ` ${item.opt} ${item.val === 'NULL' ? item.val : `'${item.val}'`}`

          if (idx < valList.length - 1) {
            sqlStr+=`${valItem} ${item.join ? item.join : 'AND'} `
          } else {
            sqlStr+=`${valItem}`
          }
        }
        
      })
      break
  }
  return sqlStr
}

function joinSqlValObj(valObj: any, type: string): string {
  let valStr = ''
  switch (type) {
    case ValEnum.LIMIT:
      valStr = valObj.start + ',' + valObj.count
      break
    default:
      break
  }
  return valStr
}

// 数据库会话操作
export function querySql(sql: querySql) {
  const sqlStr = createSqlStr(sql)
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

