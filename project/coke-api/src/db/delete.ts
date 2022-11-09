import { values as ValValuesType } from '../types/sql'
import { joinWhereVal } from './keyword'
export default function createSqlStr(sql: deleteSql, user: boolean): string {
  let str = `UPDATE ${sql.table} SET `
  let values = [] as (string | number)[]
  let valArr:ValValuesType[] = [
    {
      key: 'is_del',
      value: 1
    },
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
  if (sql.values) {
    valArr = [
      ...valArr,
      ...sql.values.filter((item: ValValuesType) => item.value)
    ]
  }
  

  valArr.map((item: ValValuesType) => {
    const valStr = typeof item.value === 'number' ? item.value : `'${item.value}'`
    values.push(`${item.key}=${valStr}`)
  })
  str = str + values.join(',')

  str = str + ` WHERE ` +joinWhereVal(sql.where)

  return str + ';'
}