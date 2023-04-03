const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const res = await commentService.create(content, momentId, id)
    ctx.body = {
      code: 0,
      message: '创建评论成功',
      data: res
    }
  }

  // 回复评论
  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user
    const res = await commentService.reply(content, momentId, commentId, id)
    ctx.body = {
      code: 0,
      message: '回复评论成功',
      data: res
    }
  }
}

module.exports = new CommentController()
