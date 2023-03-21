const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  database: 'juejin',
  user: 'root',
  password: '123456',
  connectionLimit: 10
})

// 检查是否连接成功
pool.getConnection((err, conn) => {
  // 获取连接错误
  if (err) {
    console.log(err)
    return
  }
  // 连接获取未报错
  conn.connect(err => {
    if (err) {
      console.log(err)
      return
    }
    console.log('数据库连接成功')
  })
})

const promisePool = pool.promise()

module.exports = promisePool
