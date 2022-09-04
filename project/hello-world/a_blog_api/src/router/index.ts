import Router from "koa-router";
import Public from './public'


const router = new Router()
router.use('/api', Public.routes(), Public.allowedMethods())

export default router