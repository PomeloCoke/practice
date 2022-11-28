import jwt from 'jsonwebtoken'
import koaJwt from 'koa-jwt'

function verifyAuthority(ctx: ctx) {
  console.log('getAuthority------')
  koaJwt({
    secret: 'jwtSecret',
    debug: true
  }).unless({
    path: [/login/]
  })
}

export default function() {
  return async function (ctx: ctx, next: next) {
    try {
      verifyAuthority(ctx)
      await next()
    }
    catch(err:any) {
      ctx.error({
        code: ctx.state.ErrorCode.MIDDLEWARE,
        msg: err.message
      })
    }
  }
}