import * as Permission from '../../controller/public/permission'
import routerGenerator from "../../middleware/router";

const controllerName = '/permission'
const routes: route[] = [
  {
    path: controllerName + '/list',
    controller: Permission.getList,
    option: {
      method: 'post',
      verifyToken: true,
    }
  },
  {
    path: controllerName + '/detail',
    controller: Permission.getDetail,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/add',
    controller: Permission.addPermission,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/edit',
    controller: Permission.editPermission,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/del',
    controller: Permission.delPermission,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
]

const routers = routerGenerator(routes)

export default routers