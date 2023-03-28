const {
  NAME_OR_PSW_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-pwd')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PSW_IS_REQUIRED, ctx)
  }

  // 查询 name 是否存在于数据库中
  const userList = await userService.findUserByName(name)
  const user = userList[0]
  if (!user) {
    return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
  }

  // 验证密码
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_ERROR, ctx)
  }

  // 将 user 保存在 ctx
  ctx.user = user

  await next()
}

module.exports = verifyLogin
