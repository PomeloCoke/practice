import option from '../../controller/public/option'
import routerGenerator from "../../middleware/router";

const controllerName = '/option'
const routes: route[] = [
  {
    path: controllerName + '/list',
    controller: option.getList,
    option: {
      method: 'post',
      verifyToken: true,
    }
  },
  {
    path: controllerName + '/detail',
    controller: option.getDetail,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/add',
    controller: option.addOption,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
]

const routers = routerGenerator(routes)

export default routers