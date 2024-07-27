const db = require("../helpers/db")

class GroupsService {
  async getGroups(req, res) {
    const restaurant_id = req.params.restaurant_id

    console.log("getGroups_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        id,
        name
      FROM \`groups\`
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async createGroup(req, res) {
    const { name, restaurant_id } = req.body
    const sqlQuery = `
        INSERT INTO \`groups\` (name, restaurant_id)
        VALUES (?, ?)
      `

    try {
      const result = await db.executeQuery(sqlQuery, [name, restaurant_id])
      return result
    } catch (error) {
      console.error("Error creating group:", error)
      throw error
    }
  }

  async updateGroup(req, res) {
    const { id, name, restaurant_id } = req.body
    const sqlQuery = `
      UPDATE \`groups\`
      SET name = ?
      WHERE id = ? AND restaurant_id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [name, id, restaurant_id])
      return result
    } catch (error) {
      console.error("Error updating type:", error)
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
      console.error("Error deleting type:", error)
      throw error
    }
  }
}

module.exports = new GroupsService()
