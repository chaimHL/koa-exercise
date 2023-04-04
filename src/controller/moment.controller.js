const momentService = require('../service/moment.service')
const { ADD_LABEL_FAIL } = require('../config/error.config')

class MomentController {
  // 创建动态
  async create(ctx) {
    // 获取动态内容
    const { content } = ctx.request.body
    // 获取发布动态的用户
    const { id } = ctx.user
    console.log('id', id)

    // 将动态内容存储到数据库
    const res = await momentService.create(content, id)
    ctx.body = {
      code: 0,
      message: '创建成功',
      data: res
    }
  }

  // 查询动态列表
  async list(ctx) {
    const { size, offset } = ctx.query
    const res = await momentService.queryList(size, offset)
    ctx.body = {
      code: 0,
      data: res
    }
  }

  // 获取动态详情
  async detail(ctx) {
    const { momentId } = ctx.params
    const res = await momentService.queryById(momentId)
    ctx.body = {
      code: 0,
      data: res?.[0]
    }
  }

  // 修改动态
  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const res = await momentService.update(momentId, content)
    ctx.body = {
      code: 0,
      message: '修改成功',
      data: res
    }
  }

  // 删除动态
  async remove(ctx) {
    const { momentId } = ctx.params
    const res = await momentService.remove(momentId)
    ctx.body = {
      code: 0,
      message: '删除成功',
      data: res
    }
  }

  // 给动态添加 label（标签）
  async addLabels(ctx) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    try {
      for (const label of labels) {
        // 判断当前 moment 是否已经有了该 label
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          // 不存在才添加 label
          await momentService.addLabel(momentId, label.id)
        }
        ctx.body = {
          code: 0,
          message: '添加标签成功~'
        }
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', ADD_LABEL_FAIL, ctx)
    }
  }
}

module.exports = new MomentController()
