import Router from "koa-router";
import home from '../../controller'
import routerGenerator from "../../middleware/router";

const routes: route[] = [
  {
    path: '/home',
    controller: home.getHome,
    option: {
      method: 'get',
      verifyToken: false,
      mustParams: [
        { name: '', type: 'string' },
        { name: '', type: 'string' }
      ]
    }
  },
  {
    path: '/test',
    controller: home.getTest,
    option: {
      method: 'post',
      verifyToken: true,
      mustParams: [
        { name: '', type: 'string' }
      ]
    }
  }
]

const routers = routerGenerator(routes)

export default routers