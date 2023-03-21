const app = require('./app')
const { SERVER_PORT } = require('./config/server.config')
// 让 process-errors.js 内代码执行
require('./utils/process-errors')

app.listen(SERVER_PORT, () => console.log('服务器启动'))
