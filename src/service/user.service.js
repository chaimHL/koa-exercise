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

  // 更新头像地址信息
  async updateUserAvatar(avatarUrl, userId) {
    const statement = 'UPDATE users SET avatar_url = ? WHERE id = ?;'
    const [res] = await connection.execute(statement, [avatarUrl, userId])
    return res
  }
}

module.exports = new UserService()
