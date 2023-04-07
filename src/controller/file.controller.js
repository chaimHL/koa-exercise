const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_HOST, SERVER_PORT } = require('../config/server.config')

class FileController {
  async create(ctx) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    await fileService.create(filename, mimetype, size, id)

    // 将头像地址信息存储到 users 表

    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`
    await userService.updateUserAvatar(avatarUrl, id)

    ctx.body = {
      code: 0,
      message: '上传成功',
      data: avatarUrl
    }
  }
}

module.exports = new FileController()
