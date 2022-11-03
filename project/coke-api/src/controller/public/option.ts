import { querySql } from "../../db"
const getHome = async (ctx: ctx, next: next) => {
  ctx.body = "helloWorld!!"
}

const getTest = async (ctx: ctx, next: next) => {
  const sql:querySql = {
    select: [
      {
        name: 'id',
        alias: 'option_id'
      }
    ],
    from: 't_public_setting_option'
  }
  const res = await querySql(sql)
  console.log('getSqlRes', res)
  ctx.success({
    data: res
  })
}

export default {
  getHome,
  getTest
}