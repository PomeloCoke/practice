import Router from "koa-router";
import koaJwt from 'koa-jwt'
const jwt = koaJwt({
  secret: 'jwtSecret',
}).unless({
  path: [/login/]
})
function routerGenerator(routes: route[]) {
  const router = new Router()
  routes.map((route, idx) => {
    const { method } = route.option
    if (method === 'get') {
      router.get(route.path,jwt, route.controller)
    }
    if (method === 'post') {
      router.post(route.path,jwt, route.controller)
    }
  }) 
  return router
}

export default routerGenerator