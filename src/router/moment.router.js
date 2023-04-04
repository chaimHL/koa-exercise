const koaRouter = require('@koa/router')
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels
} = require('../controller/moment.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new koaRouter({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyAuth, create)

// 获取动态列表
momentRouter.get('/list', list)
// 获取动态详情
momentRouter.get('/:momentId', detail)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post(
  '/:momentId/labels',
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
)

module.exports = momentRouter
