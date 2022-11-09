import {
  select as ValSelectType,
  where as ValWhereType,
  orderBy as ValOrderByType,
  sqlValType as ValType
} from '../types/sql'

import { formatDate, typeData } from '../utils'
// select关键字处理
export function joinSelectVal(valList: any):string {
  let valStr = [] as string[]
  let sqlStr = ''
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
  return sqlStr
}

// where关键字处理
export function joinWhereVal(valList: any):string {
  let sqlStr = ''
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
      sqlStr+=`(${joinWhereVal(childVal)})`
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
  return sqlStr
}