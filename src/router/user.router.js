const KoaRouter = require('@koa/router')
const { verifyUser, processPwd } = require('../middleware/user.middleware')
const { create, showAvatarImg } = require('../controller/user.controller')

const userRouter = new KoaRouter({ prefix: '/user' })

// 用户注册接口
userRouter.post('/', verifyUser, processPwd, create)

// 展示用户头像
userRouter.get('/avatar/:userId', showAvatarImg)

module.exports = userRouter
