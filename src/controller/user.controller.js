const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { UPLOAD_PATH } = require('../config/path')

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

  // 展示头像
  async showAvatarImg(ctx) {
    const { userId } = ctx.params

    // 获取数据库中头像信息
    const res = await fileService.queryAvatarByUserId(userId)
    const { filename, mimetype } = res

    ctx.type = mimetype // 告诉客户端是图像，否则会直接下载
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
