import { getOptionList } from "../../model/public/option"
const getHome = async (ctx: ctx, next: next) => {
  ctx.body = "helloWorld!!"
}

const getList = async (ctx: ctx, next: next) => {
  
  const { id, parent_id, name_c, side, page, page_count } = ctx.request.body
  const params = { id, parent_id, name_c, side, page, page_count }
  const res = await getOptionList(params)
  console.log('getSqlRes', res)
  ctx.success({
    data: res
  })
}

export default {
  getHome,
  getList
}