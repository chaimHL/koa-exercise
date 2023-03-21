const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, processPwd } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/users' })

// 用户注册接口
userRouter.post('/', verifyUser, processPwd, userController.create)

module.exports = userRouter
