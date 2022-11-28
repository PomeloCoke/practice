import Koa from 'koa'
import config from './config'
import serverInit from './middleware/server'  // 服务器异常监听
import ctxResponse from './middleware/response'   // 回参格式
import headerGenerator from './middleware/http'   // 跨域设置
import bodyParser from './middleware/bodyparser'  // 入参解析
import validator from './middleware/validator'  // 校验入参
// import authority from './middleware/authority'  // 校验路由权限
import koaJwt from 'koa-jwt'
import routerFrame from './router'  // 挂载路由

const app = new Koa()

app.use(serverInit())
app.use(ctxResponse())
app.use(headerGenerator())
app.use(bodyParser())
app.use(validator())
// app.use(koaJwt({
//   secret: 'jwtSecret',
//   debug: true
// }).unless({
//   path: [/login/]
// }))
app.use(routerFrame.routes()).use(routerFrame.allowedMethods())

app.listen(3002, () => {

})
