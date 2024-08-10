const db = require("../helpers/db")

class TypesService {
  async getTypes(req, res) {
    const restaurant_id = req.params.restaurant_id

    console.log("getTypes_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        id,
        type,
        translations
      FROM types
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async createType(req, res) {
    const { type, restaurant_id, translations } = req.body
    const sqlQuery = `
        INSERT INTO types (type, restaurant_id, translations)
        VALUES (?, ?, ?)
      `

    try {
      const result = await db.executeQuery(sqlQuery, [type, restaurant_id, JSON.stringify(translations)])
      return result
    } catch (error) {
      console.error("Error creating type:", error)
      throw error
    }
  }

  async updateType(req, res) {
    console.log('req.body :>> ', req.body);
    const { id, type, restaurant_id, translations } = req.body
    const sqlQuery = `
      UPDATE types
      SET type = ?, translations = ?
      WHERE id = ? AND restaurant_id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [type, JSON.stringify(translations), id, restaurant_id])
      return result
    } catch (error) {
      console.error("Error updating type:", error)
      throw error
    }
  }

  // Метод deleteType остается без изменений
}

module.exports = new TypesService()