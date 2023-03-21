// 统一错误处理
const app = require('../app')
const {
  NAME_OR_PSW_IS_REQUIRED,
  NAME_IS_EXISTS
} = require('../config/error.config')

app.on('error', (error, ctx) => {
  let code = 0
  let msg = ''
  switch (error) {
    case NAME_OR_PSW_IS_REQUIRED:
      code = -1001
      msg = '用户名或密码不能为空'
      break
    case NAME_IS_EXISTS:
      code = -1002
      msg = '用户名已存在'
      break
  }
  ctx.body = {
    code,
    msg
  }
})
