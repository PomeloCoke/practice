type responseOption = {
  code?:number, // 返回码
  msg?:string,  // 返回信息
  data?:any   // 返回数据
}
function successModel(ctx: ctx) {
  ctx.success = function(option: responseOption={}) {
    ctx.body = {
      code: 0,
      msg: option.msg || 'success',
      data: option.data || ''
    }
  }
}

function errorModel(ctx: ctx) {
  ctx.error = function(option:responseOption={}) {
    ctx.body = {
      code: option.code || 10001,
      msg: option.msg || 'error',
      data: ''
    }
  }
}

export default function() {
  return async function (ctx: ctx, next: next) {
    successModel(ctx)
    errorModel(ctx)
    await next()
  }
}