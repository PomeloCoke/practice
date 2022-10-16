import Router from "koa-router";
import Public from './public'

const router = new Router()
router.use('/api/public', Public.routes(), Public.allowedMethods())

export default router