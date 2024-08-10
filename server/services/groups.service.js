const db = require("../helpers/db")

class GroupsService {
  async getGroups(req, res) {
    const restaurant_id = req.params.restaurant_id

    console.log("getGroups_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        id,
        name,
        translations
      FROM \`groups\`
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async createGroup(req, res) {
    const { name, restaurant_id, translations } = req.body
    const sqlQuery = `
        INSERT INTO \`groups\` (name, restaurant_id, translations)
        VALUES (?, ?, ?)
      `

    try {
      const result = await db.executeQuery(sqlQuery, [name, restaurant_id, JSON.stringify(translations)])
      return result
    } catch (error) {
      console.error("Error creating group:", error)
      throw error
    }
  }

  async updateGroup(req, res) {
    console.log('req.body :>> ', req.body);
    const { id, name, restaurant_id, translations } = req.body
    const sqlQuery = `
      UPDATE \`groups\`
      SET name = ?, translations = ?
      WHERE id = ? AND restaurant_id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [name, JSON.stringify(translations), id, restaurant_id])
      return result
    } catch (error) {
      console.error("Error updating group:", error)
      throw error
    }
  }

  async deleteGroup(req, res) {
    const id = req.params.id
    console.log("group_id", id)

    const sqlQuery = `
      DELETE FROM \`groups\`
      WHERE id = ? 
    `

    try {
      const result = await db.executeQuery(sqlQuery, [id])
      return result
    } catch (error) {
      console.error("Error deleting group:", error)
      throw error
    }
  }
}

module.exports = new GroupsService()