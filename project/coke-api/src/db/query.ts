import { SqlVal as ValEnum } from '../enum/sql'
import { joinSelectVal, joinWhereVal } from './keyword'
import { typeData } from '../utils'

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
  let sqlStr = ''
  switch (type) {
    case ValEnum.SELECT:
      sqlStr = joinSelectVal(valList)
      break
    case ValEnum.WHERE:
      sqlStr = joinWhereVal(valList)
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

