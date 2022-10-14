import Router from "koa-router";

function routerGenerator(routes: route[]) {
  const router = new Router()
  routes.map((route, idx) => {
    const { method } = route.option
    if (method === 'get') {
      router.get(route.path, route.controller)
    }
    if (method === 'post') {
      router.post(route.path, route.controller)
    }
  }) 
  return router
}

export default routerGenerator