const crypto = require('crypto')
function md5Password(pwd) {
  const md5 = crypto.createHash('md5')
  // md5.update(pwd) 将密码通过 md5 加密
  // .digest('hex') 以 16 进制形式展示
  const md5Pwd = md5.update(pwd).digest('hex')
  return md5Pwd
}

module.exports = md5Password
