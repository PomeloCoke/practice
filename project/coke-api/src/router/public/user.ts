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
  }
]

const routers = routerGenerator(routes)

export default routers