import { values as ValValuesType } from '../types/sql'

export default function createSqlStr(sql: insertSql, user: boolean, def_insert: boolean): string {
  let str = `INSERT INTO ${sql.table} `

  if (typeof sql.values === 'string') {
    return str + sql.values
  }

  let valArr = [] as ValValuesType[]
  if (def_insert) {
    valArr = [
      {
        key: 'create_time',
        value: new Date().toLocaleString()
      },
      {
        key: 'edit_time',
        value: new Date().toLocaleString()
      },
    ]
  }
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

  let keys = [] as string[]
  let values = [] as (string | number)[]
  valArr.map((item: ValValuesType) => {
    keys.push(item.key)
    values.push(typeof item.value === 'number' ? item.value : `'${item.value}'`)
  })

  str = str + `(${keys.join(',')}) VALUES (${values.join(',')})`
  return str + ';'
}