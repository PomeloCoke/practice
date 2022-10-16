import { ErrorCode } from "../enum/errorCode"
export default function() {
  return async function (ctx: ctx, next: next) {
    try{
      ctx.state.ErrorCode = ErrorCode
      await next()
      if(!ctx.body) {
        ctx.status = 404
        ctx.body = {
          code: ctx.state.ErrorCode.SERVER,
          msg: 'Not Found',
          data: ''
        }
      }
    }
    catch(err:any) {
      ctx.status = 500
      ctx.body = {
        code: ctx.state.ErrorCode.SERVER,
        msg: err.message,
        data: ''
      }
    }
  }
}