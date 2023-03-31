const { NO_PERMISSION } = require('../config/error.config')
const permissionService = require('../service/permission.service')

// 验证权限
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user

  // 获取要查询的资源的名称，比如 momentId
  const key = Object.keys(ctx.params)[0]
  // 获取资源 id
  const resourceId = ctx.params[key]
  // 获取资源名，其实就是表名
  const resourceName = key.replace('Id', '')

  // 查询数据库
  const isPermission = await permissionService.checkResource(
    resourceName,
    resourceId,
    id
  )
  if (!isPermission) {
    return ctx.app.emit('error', NO_PERMISSION, ctx)
  }

  await next()
}

module.exports = {
  verifyPermission
}
