
import utils from './utils'
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
  type sqlSelect = {
    name: string,
    alias?: string
  }
  type sqlWhere = {
    name: string,
    opt: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'BETWEEN' | 'LIKE' | 'IN',
    val: number | string 
  }
  type sqlOrderBy = {
    name: string,
    order?: 'asc' | 'desc'
  }
  
  type querySql = {
    select: '*' | (string | sqlSelect)[],
    from: string,
    where?: (string | sqlWhere)[],
    order_by?: (string | sqlOrderBy)[]
  }

  const typeData:(data: any, type: string)=>any
}

export { }