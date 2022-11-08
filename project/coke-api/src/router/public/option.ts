import option from '../../controller/public/option'
import routerGenerator from "../../middleware/router";

const controllerName = '/option'
const routes: route[] = [
  {
    path: controllerName + '/home',
    controller: option.getHome,
    option: {
      method: 'get',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/list',
    controller: option.getList,
    option: {
      method: 'post',
      verifyToken: true,
    }
  }
]

const routers = routerGenerator(routes)

export default routers