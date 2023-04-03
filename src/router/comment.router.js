const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, reply } = require('../controller/comment.controller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

// 新增评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/reply', verifyAuth, reply)

module.exports = commentRouter
