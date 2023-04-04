const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  // 获取客户端传递的 lables
  const labels = ctx.request.body

  // 判断 label 是否已经存在于数据库中
  const newLabels = []
  for (const label of labels) {
    const res = await labelService.queryLabelByName(label)
    const tempObj = { name: label }
    if (res) {
      // 获取 label 的 id
      tempObj.id = res.id
    } else {
      // 往 label 表插入 label，然后获取 id
      const res = await labelService.create(label)
      tempObj.id = res.insertId // 插入成功后返回的对象里有 insertId
    }
    newLabels.push(tempObj)
  }
  // 将处理过后，确保都已存在于数据库的 newLabels 数组，诸如 [ { name: '放假', id: 4 }, { name: 'LPL', id: 5 } ] 赋值给 ctx
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}
