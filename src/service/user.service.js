const connection = require('../database')
// 与数据库交互
class UserService {
  async create(payload) {
    const { name, password } = payload
    const statement = 'INSERT INTO users (name, `password`) VALUES (?, ?);'
    // 通过解构赋值得到数据库执行结果
    const [rows] = await connection.execute(statement, [name, password])
    return rows
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM users WHERE name = ?;'
    const [rows] = await connection.execute(statement, [name])
    return rows
  }
}

module.exports = new UserService()
