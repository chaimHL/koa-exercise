const connection = require('../database')

class MomentService {
  // 创建动态
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    const [res] = await connection.execute(statement, [content, userId])
    return res
  }

  // 查询列表
  async queryList(size = 7, offset = 0) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) user,
        (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label WHERE moment_id = m.id) labelCount
      FROM moment m 
      LEFT JOIN users u ON u.id = m.user_id LIMIT ? OFFSET ?;
    `
    const [res] = await connection.execute(statement, [size, offset])
    return res
  }

  // 查询详情
  async queryById(id) {
    const statement = `
        SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) user, 
        (
          SELECT 
            JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'momentId', c.comment_id, 'createAt', c.createAt,  'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatar', cu.avatar_url)))
          FROM comment c
          LEFT JOIN users cu ON cu.id = c.user_id
          WHERE c.moment_id = m.id
        ) comments,
        (
          JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name))
        ) labels
      FROM moment m 
      LEFT JOIN users u ON u.id = m.user_id
      
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    const [res] = await connection.execute(statement, [id])
    return res
  }

  // 修改
  async update(id, content) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const [res] = await connection.execute(statement, [content, id])
    return res
  }

  // 删除
  async remove(id) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [res] = await connection.execute(statement, [id])
    return res
  }

  // 判断是否有某标签
  async hasLabel(momentId, labelId) {
    const statement =
      'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
    const [res] = await connection.execute(statement, [momentId, labelId])
    return !!res.length
  }

  // 添加标签
  async addLabel(momentId, labelId) {
    const statement =
      'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);'
    const res = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports = new MomentService()
