import mysql from 'mysql'
import config from '@/config/db-config'

// 创建数据池
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

function createSqlStr(sql:querySql):string {
  let str = ''
  Object.keys(sql).map((key) => {
    const sqlKey = key.toUpperCase()
    let sqlItem = ''
    if (sql[key]) {
      
    }
  })
  return ''
}

// 数据库会话操作
function querySql(sql:querySql) {

}