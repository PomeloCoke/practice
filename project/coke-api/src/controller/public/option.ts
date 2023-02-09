import { PermissionGroup } from '../../enum/premissionGroup'
import { typeData } from '../../utils'
import * as optionModel from "../../model/public/option" 

// 获取筛选项列表
const getList = async (ctx: ctx, next: next) => {
  const { SUPER_ADMIN } = PermissionGroup
  const perRes = global.validPermission([SUPER_ADMIN],ctx)
  if (!perRes) return
  console.log('getPremission',SUPER_ADMIN,ctx.session.user,perRes)
  const { id, parent_id, name_c, side, page, page_count } = ctx.request.body

  const params = { id, parent_id, name_c, side, page, page_count }
  const res = await optionModel.getOptionList(params)
  if (res.res) {
    ctx.success({
      data: res
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.QUERY_FAIL,
      msg: res.msg
    })
  }
}

// 获取筛选项详情
const getDetail = async (ctx: ctx, next: next) => {
  const { id } = ctx.request.body

  const params = { id }
  const res = await optionModel.getOptionDetail(params)
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

// 添加筛选项
const addOption = async (ctx: ctx, next: next) => {
  const { parent_id, name_c, name_e, side } = ctx.request.body

  const vaildParams = { parent_id, name_c, side }
  const vaild = await optionModel.editOptionValid(vaildParams)
  
  if (!vaild.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: vaild.msg
    })
    return
  }

  const params = { parent_id, name_c, name_e, side }
  const res = await optionModel.addOptionItem(params)
  
  if (res.res) {
    ctx.success({
      msg: '添加筛选项成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.INSERT_FAIL,
      msg: res.msg
    })
  }
}

// 编辑筛选项
const editOption = async (ctx: ctx, next: next) => {
  const { id, parent_id, name_c, name_e, side } = ctx.request.body

  const vaildParams = { parent_id, name_c, side }
  const vaild = await optionModel.editOptionValid(vaildParams)
  if (!vaild.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: vaild.msg
    })
    return
  }

  const params = { id, parent_id, name_c, name_e, side }
  const res = await optionModel.editOptionItem(params)
  if (res.res) {
    ctx.success({
      msg: '编辑筛选项成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.UPDATE_FAIL,
      msg: res.msg
    })
  }
}

// 删除筛选项
const delOption = async (ctx: ctx, next: next) => {
  const { id } = ctx.request.body

  const vaildParams = { id }
  const vaild = await optionModel.delOptionValid(vaildParams)
  if (!vaild.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: vaild.msg
    })
    return
  }

  const params = { id }
  const res = await optionModel.delOptionItem(params)
  if (res.res) {
    ctx.success({
      msg: '删除筛选项成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.DELETE_FAIL,
      msg: res.msg
    })
  }
}

export default {
  getList,
  getDetail,
  addOption,
  editOption,
  delOption
}