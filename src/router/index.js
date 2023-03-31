const fs = require('fs')
function registerRouters(app) {
  // 读取当前目录下（router）所有文件的文件名
  const files = fs.readdirSync(__dirname)
  for (file of files) {
    // 跳过不是以 .router.js 结尾的文件
    if (!file.endsWith('.router.js')) continue
    // 引入文件
    const router = require(`./${file}`)
    // 注册路由
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters
