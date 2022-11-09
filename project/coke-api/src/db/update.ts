import { values as ValValuesType } from '../types/sql'
import { joinWhereVal } from './keyword'
export default function createSqlStr(sql: updateSql, user: boolean): string {
  let str = `UPDATE ${sql.table} SET `
  let values = [] as (string | number)[]
  let valArr:ValValuesType[] = [
    {
      key: 'edit_time',
      value: new Date().toLocaleString()
    },
  ]
  if (!user) {
    valArr.push({
      key: 'edit_id',
      value: 1
    })
  }
  valArr = [
    ...valArr,
    ...sql.values.filter((item: ValValuesType) => item.value)
  ]

  valArr.map((item: ValValuesType) => {
    const valStr = typeof item.value === 'number' ? item.value : `'${item.value}'`
    values.push(`${item.key}=${valStr}`)
  })
  str = str + values.join(',')

  if (sql.where) {
    str = str + ` WHERE ` +joinWhereVal(sql.where)
  }

  return str + ';'
}