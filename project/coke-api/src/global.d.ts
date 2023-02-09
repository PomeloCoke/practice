
import utils from './utils'
import { insert, query, update, del } from './types/sql'
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }
  function validPermission(permission: number[], user: number[]):boolean


  // 框架相关
  type ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>
  type next = Koa.Next
  type koaApp = Koa

  // 路由相关
  type route = {
    path: string,
    controller: any,
    option: {
      method: string,
      verifyToken: boolean
    }
  }

  // 数据库相关
  type querySql = query
  type insertSql = insert
  type updateSql = update
  type deleteSql = del

  type validResType = {
    res: boolean,
    data: any,
    code: number,
    msg: any
  }

  const typeData:(data: any, type: string)=>any
  // const validPermission:(permission: number[], user: number[])=>boolean
}

export { }