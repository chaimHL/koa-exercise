const {
  NAME_OR_PSW_IS_REQUIRED,
  NAME_IS_EXISTS
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-pwd')

const verifyUser = async (ctx, next) => {
  // 验证用户名和密码
  const { name, password } = ctx.request.body
  // 判断是否有空值
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PSW_IS_REQUIRED, ctx)
  }
  // 检查用户名是否已经存在
  const user = await userService.findUserByName(name)
  if (user.length) {
    return ctx.app.emit('error', NAME_IS_EXISTS, ctx)
  }

  // 此处需要添加 await，不添加 await 虽然不影响校验，
  // 但会导致没等到下一个中间件的异步函数执行完毕就向客户端返回了 404 Not Found
  await next()
}

// 对密码进行加密
const processPwd = async (ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  processPwd
}
