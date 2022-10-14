

function setResHeader(ctx: ctx) {
  // const { origin, Origin, referer, Referer } = ctx.request.headers;
  // const allowOrigin = origin || Origin || referer || Referer || '*';
  console.log('getCtx', ctx.request.body)
  const headerConfig = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
  }
  ctx.request.headers = headerConfig
}

export default function() {
  return async function (ctx: ctx, next: next) {
    setResHeader(ctx)
    await next()
  }
}