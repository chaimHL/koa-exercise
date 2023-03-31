const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new koa()

app.use(bodyParser())
// 注册路由，要放在 bodyParser 之后
registerRouters(app)

module.exports = app
