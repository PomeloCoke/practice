import Koa from 'koa'
import config from './config'
import headerGenerator from './middleware/http'
import routerFrame from './router'

const app = new Koa()

app.use(headerGenerator())

app.use(routerFrame.routes()).use(routerFrame.allowedMethods())

app.listen(3001)