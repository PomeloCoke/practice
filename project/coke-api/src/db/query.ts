import { SqlVal as ValEnum } from '../enum/sql'
import {
  select as ValSelectType,
  where as ValWhereType,
  orderBy as ValOrderByType,
  sqlValType as ValType
} from '../types/sql'
import { formatDate, typeData } from '../utils'

export default function createSqlStr(sql: querySql): string {
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
      valList.map((item: any) => {
        let valItem
        if (typeData(item, 'String')) {
          valItem = item
          if (item === 'create_time' || item === 'edit_time') {
            valItem = formatDate(item)
          }
        } else {
          valItem = item.name
          if (item.name === 'create_time' || item.name === 'edit_time') {
            valItem = formatDate(item.name)
          }
          if (item.alias) valItem+= ` AS ${item.alias}`
        }
        
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

