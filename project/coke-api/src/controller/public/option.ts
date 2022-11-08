import { editOptionValid, getOptionDetail, getOptionList } from "../../model/public/option"
import { typeData } from '../../utils'

// 获取筛选项列表
const getList = async (ctx: ctx, next: next) => {
  const { id, parent_id, name_c, side, page, page_count } = ctx.request.body
  const params = { id, parent_id, name_c, side, page, page_count }
  const res = await getOptionList(params)
  ctx.success({
    data: res
  })
}

// 获取筛选项详情
const getDetail = async (ctx: ctx, next: next) => {
  const { id } = ctx.request.body
  const params = { id }
  const res = await getOptionDetail(params)
  if (typeData(res, 'Array') && res.length === 0) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_INEXISTENCE,
      msg: '筛选项不存在'
    })
    return
  }
  ctx.success({
    data: res
  })
}

const addOption = async (ctx: ctx, next: next) => {
  const { parent_id, name_c, name_e, side } = ctx.request.body
  const params = { parent_id, name_c, name_e, side }
  const vaildParams = { parent_id, name_c, side }
  const vaild = await editOptionValid(vaildParams)
  ctx.success({
    data: vaild.res,
    msg: vaild.msg
  })
}

export default {
  getDetail,
  getList,
  addOption,
}