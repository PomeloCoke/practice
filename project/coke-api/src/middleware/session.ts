import session from 'koa-session'
import redis from '../cache'
async function getSession(ctx: ctx, app: koaApp) {
  const config = {
    key: 'pomelode',
    maxAge: 1000 * 60 * 60,
  }
  app.use(session(config,app))
  if (ctx.request.header['authorization']) {
    const sessionId = ctx.request.header['authorization'].split(' ')[1]
    const userCache = await redis.get(sessionId) || ''
    ctx.session.user = JSON.parse(userCache)
    if (!userCache) {
      return false
    }
  }
  return true
}

export default function(app: koaApp) {
  return async function (ctx: ctx, next: next) {
    try {
      const sessionRes =  await getSession(ctx, app)
      if (sessionRes) {
        await next()
      } else {
        ctx.error({
          code: ctx.state.ErrorCode.MIDDLEWARE,
          msg: '未获取到session'
        })
      }
      
    } catch (err:any) {
      ctx.error({
        code: ctx.state.ErrorCode.SERVER,
        msg: err.message
      })
    }
  }
}