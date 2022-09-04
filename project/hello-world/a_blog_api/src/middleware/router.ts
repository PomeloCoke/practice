import Router from "koa-router";

function routerGenerator(routes: route[]) {
  const router = new Router()
  routes.map((route, idx) => {
    router.get(route.path, route.controller)
  }) 
  console.log('getRouter----', router)
  return router
}

export default routerGenerator