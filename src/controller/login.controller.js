const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')
class LoginCcontroller {
  sign(ctx, next) {
    const { id, name } = ctx.user
    // 颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7, // 7天，单位为秒
      algorithm: 'RS256'
    })

    ctx.body = {
      code: 0,
      data: {
        token,
        id,
        name
      }
    }
  }

  test(ctx, next) {
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '')
    ctx.body = 123
  }
}

module.exports = new LoginCcontroller()
