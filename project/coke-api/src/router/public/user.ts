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
  }
]

const routers = routerGenerator(routes)

export default routers