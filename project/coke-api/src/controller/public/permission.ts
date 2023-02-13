import { PermissionGroup } from '../../enum/permissionGroup'
import * as permissionModel from "../../model/public/permission" 

// 获取权限组列表
export const getList = async (ctx: ctx, next: next) => {

  const { id, product_id, name_c, name_e, page, page_count } = ctx.request.body
}

// 获取权限组详情
export const getDetail = async (ctx: ctx, next: next) => {

  const { id } = ctx.request.body
}

// 增加权限组
export const addPermission = async (ctx: ctx, next: next) => {

  const { name_c, name_e, product_id, description } = ctx.request.body
}

// 编辑权限组
export const editPermission = async (ctx: ctx, next: next) => {

  const { id, name_c, name_e, description } = ctx.request.body
}

// 删除权限组
export const delPermission = async (ctx: ctx, next: next) => {

  const { id } = ctx.request.body
}

// 在权限组中增加用户
export const editPermissionUsers = async (ctx: ctx, next: next) => {

  const { id, uids } = ctx.request.body
}

// 给页面、功能增加/编辑权限组
export const editMenuPermissions = async (ctx: ctx, next: next) => {

  const { uid, ids } = ctx.request.body
}

// 给用户增加/编辑权限组
export const editUserPermissions = async (ctx: ctx, next: next) => {

  const { uid, ids } = ctx.request.body
}



