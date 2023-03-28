const crypto = require('crypto')
function md5Password(pwd) {
  const md5 = crypto.createHash('md5')
  // 将密码通过 md5 加密，注意 pwd 的类型不能是数字
  const md5Pwd = md5.update(pwd)
  // 以 16 进制形式展示
  const md5PwdHex = md5Pwd.digest('hex')
  return md5PwdHex
}

module.exports = md5Password
