const getHome = async (ctx: ctx, next: next) => {
  ctx.body = "helloWorld!!"
}

const getTest = async (ctx: ctx, next: next) => {
  ctx.body = "test~~~~~~"
}

export default {
  getHome,
  getTest
}