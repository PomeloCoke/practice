function setResHeader(ctx: ctx) {
  const headerConfig = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '1800',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
  }
  ctx.request.headers = {...ctx.request.headers,...headerConfig}
}

export default function() {
  return async function (ctx: ctx, next: next) {
    try {
      setResHeader(ctx)
      await next()
    }
    catch(err:any) {
      ctx.error({
        code: ctx.state.ErrorCode.SERVER,
        msg: err.message
      })
    }
  }
}