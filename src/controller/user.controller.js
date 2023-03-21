const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const payload = ctx.request.body

    // 得到 src\service\user.service.js 中数据库处理结果
    const res = await userService.create(payload)

    // 向客户端返回信息
    ctx.body = {
      msg: '创建用户成功',
      data: res
    }
  }
}

module.exports = new UserController()
