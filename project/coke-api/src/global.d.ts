
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }

  // 框架相关
  type ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>
  type next = Koa.Next

  // 路由相关
  type routeMustParams = {
    name: string,
    type: string
  }
  type route = {
    path: string,
    controller: any,
    option: {
      method: string,
      verifyToken: boolean,
      mustParams: routeMustParams[]
    }
  }
}

export { }