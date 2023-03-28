// 统一错误处理
const app = require('../app')
const {
  NAME_OR_PSW_IS_REQUIRED,
  NAME_IS_EXISTS,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR
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
    case USER_IS_NOT_EXISTS:
      code = -1003
      msg = '用户名不存在'
      break
    case PASSWORD_IS_ERROR:
      code = -1004
      msg = '密码不正确'
      break
  }
  ctx.body = {
    code,
    msg
  }
})
