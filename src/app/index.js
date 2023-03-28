const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const loginRouter = require('../router/login.router')
const userRouter = require('../router/user.router')

const app = new koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

module.exports = app
