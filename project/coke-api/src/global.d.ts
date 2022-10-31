
import utils from './utils'
import { query } from './types/sql'
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }


  // 框架相关
  type ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>
  type next = Koa.Next

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

  const typeData:(data: any, type: string)=>any
}

export { }