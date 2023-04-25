import { PermissionGroup } from '../../enum/permissionGroup'
import * as permissionModel from "../../model/public/permission" 

// 获取权限组列表
export const getList = async (ctx: ctx, next: next) => {
  const { id, product_id, name_c, name_e, page, page_count } = ctx.request.body

  const params = { id, product_id, name_c, name_e, page, page_count }
  const res = await permissionModel.getPermissionList(params)
  if (res.res) {
    ctx.success({
      data: res.data
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.QUERY_FAIL,
      msg: res.msg
    })
  }
}

// 获取权限组详情
export const getDetail = async (ctx: ctx, next: next) => {

  const { id } = ctx.request.body
}

// 增加权限组
export const addPermission = async (ctx: ctx, next: next) => {
  const { name_c, name_e, product_id, description } = ctx.request.body

  const vaildParams = { name_c, product_id }
  const vaild = await permissionModel.editPermissionValid(vaildParams)
  if (!vaild.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: vaild.msg
    })
    return
  }

  const params = { name_c, name_e, product_id, description }
  const res = await permissionModel.addPermission(params)
  if (res.res) {
    ctx.success({
      msg: '添加权限组成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.INSERT_FAIL,
      msg: res.msg
    })
  }
}

// 编辑权限组
export const editPermission = async (ctx: ctx, next: next) => {
  const { id, name_c, name_e, product_id, description } = ctx.request.body

  const vaildParams = { name_c, product_id, id }
  const vaild = await permissionModel.editPermissionValid(vaildParams)
  if (!vaild.res) {
    ctx.error({
      code: ctx.state.ErrorCode.DATA_EXIST,
      msg: vaild.msg
    })
    return
  }

  const params = { id, name_c, name_e, product_id, description }
  const res = await permissionModel.editPermission(params)
  if (res.res) {
    ctx.success({
      msg: '编辑权限组成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.INSERT_FAIL,
      msg: res.msg
    })
  }
}

// 删除权限组
export const delPermission = async (ctx: ctx, next: next) => {

  const { id } = ctx.request.body
}

// 在权限组中增加账户
export const editPermissionUsers = async (ctx: ctx, next: next) => {
  const { id, name_c, cids } = ctx.request.body
  const params = { id, name_c, cids }
  const res = await permissionModel.editUsers(params)
  if (res.res) {
    ctx.success({
      msg: '编辑权限组成功'
    })
  } else {
    ctx.error({
      code: ctx.state.ErrorCode.INSERT_FAIL,
      msg: res.msg
    })
  }
}

// TODO 给页面、功能增加/编辑权限组
export const editMenuPermissions = async (ctx: ctx, next: next) => {

  const { uid, ids } = ctx.request.body
}

// TODO 给账户增加/编辑权限组
export const editUserPermissions = async (ctx: ctx, next: next) => {

  const { uid, ids } = ctx.request.body
}



