import home from '../../controller'
import routerGenerator from "../../middleware/router";

const routes: route[] = [
  {
    path: '/home',
    controller: home.getHome,
    option: {
      method: 'get',
      verifyToken: false,
    }
  },
  {
    path: '/test',
    controller: home.getTest,
    option: {
      method: 'post',
      verifyToken: true,
    }
  }
]

const routers = routerGenerator(routes)

export default routers