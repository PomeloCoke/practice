

function setResCtx(ctx: ctx) {
  
}

export default function() {
  return async function (ctx: ctx, next: next) {
    setResCtx(ctx)
    await next()
  }
}