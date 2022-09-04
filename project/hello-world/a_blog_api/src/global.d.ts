
declare global {
  interface Array<T> {
    remove(val: T): Array<T>
  }

  type ctx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>
  type next = Koa.Next

  type route = {
    path: string,
    controller: any
  }
}

export { }