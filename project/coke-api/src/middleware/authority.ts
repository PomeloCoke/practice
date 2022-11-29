import koaJwt from 'koa-jwt'
// TODO 更改加密密钥
export default koaJwt({
  secret: 'jwtSecret',
}).unless({
  path: [/login/]
})