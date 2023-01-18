import user from '../../controller/public/user'
import routerGenerator from "../../middleware/router";

const controllerName = '/user'
const routes: route[] = [
  {
    path: controllerName + '/login',
    controller: user.login,
    option: {
      method: 'post',
      verifyToken: false,
    }
  },
  {
    path: controllerName + '/add',
    controller: user.addUser,
    option: {
      method: 'post',
      verifyToken: true,
    }
  },
  {
    path: controllerName + '/edit',
    controller: user.editUser,
    option: {
      method: 'post',
      verifyToken: true,
    }
  },
  {
    path: controllerName + '/list',
    controller: user.getList,
    option: {
      method: 'post',
      verifyToken: true,
    }
  },
  {
    path: controllerName + '/detail',
    controller: user.getDetail,
    option: {
      method: 'post',
      verifyToken: true,
    }
  }
]

const routers = routerGenerator(routes)

export default routers