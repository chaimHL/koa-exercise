const connection = require('../database')
// 与数据库交互
class PermissionService {
  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [rows] = await connection.execute(statement, [resourceId, userId])
    // 根据是否返回结果判断是否有操作权限
    return !!rows.length
  }
}

module.exports = new PermissionService()
