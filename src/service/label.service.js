const connection = require('../database')

class LabelService {
  async create(name) {
    const statement = 'INSERT INTO label (name) VALUES (?);'
    const [res] = await connection.execute(statement, [name])
    return res
  }

  async queryLabelByName(name) {
    const statement = 'SELECT * FROM label WHERE `name` = ?;'
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }
}

module.exports = new LabelService()
