import Router from "koa-router";
import Option from './public/option'
import User from './public/user'
import Permission from './public/permission'

const router = new Router()
router.use('/api/public', Option.routes(), Option.allowedMethods())
router.use('/api/public', User.routes(), User.allowedMethods())
router.use('/api/public', Permission.routes(), Permission.allowedMethods())

export default router