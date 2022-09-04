import Router from "koa-router";
import home from '../../controller'
import routerGenerator from "../../middleware/router";

const routes = [
  {
    path: '/home',
    controller: home.getHome
  },
  {
    path: '/test',
    controller: home.getTest
  }
]

const routers = routerGenerator(routes)

export default routers