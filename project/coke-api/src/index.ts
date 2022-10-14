import Koa from 'koa'
import config from './config'
import headerGenerator from './middleware/http'
import bodyParser from './middleware/bodyparser'
import routerFrame from './router'

const app = new Koa()
app.use(bodyParser())
app.use(headerGenerator())

app.use(routerFrame.routes()).use(routerFrame.allowedMethods())


app.listen(3001, () => {

})