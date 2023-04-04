const jwt = require('jsonwebtoken')
const {
  NAME_OR_PSW_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR,
  UNAUTHORIZED
} = require('../config/error.config')
const { PUBLIC_KEY } = require('../config/secret')
const userService = require('../service/user.service')
const md5Password = require('../utils/md5-pwd')

// 验证是否可以登录
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

// 验证是否已经登录
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    try {
      const res = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256']
      })
      // 保存 token 的 payload 信息，也就是用户 id、name 以及令牌颁发和过期时间
      ctx.user = res
      await next()
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', UNAUTHORIZED, ctx)
    }
  } else {
    ctx.app.emit('error', UNAUTHORIZED, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
