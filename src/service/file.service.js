const connection = require('../database')

class FileService {
  // 上传头像
  async create(filename, mimetype, size, userId) {
    const statement =
      'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [res] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ])
    return res
  }

  // 查看头像
  async queryAvatarByUserId(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?;'
    const [res] = await connection.execute(statement, [userId])
    return res.pop()
  }
}

module.exports = new FileService()
