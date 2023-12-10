const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/sqlConfig")

class RestaurantsService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig)
  }

  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection()

    try {
      const [results] = await connection.execute(sqlQuery, values)
      console.error("Executing SQL query was success - results :", results)

      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
      throw error
    } finally {
      connection.release()
    }
  }

  async getRestaurant(req, res) {
    const restaurant_id = req.params.restaurant_id

    const sqlQuery = `
      SELECT
        id,
        name
       FROM restaurants
      WHERE id = ?
    `
    return this.executeQuery(sqlQuery, [restaurant_id])
  }

  async getRestaurants(req, res) {
    const sqlQuery = `
      SELECT
        id,
        name
       FROM restaurants
     `
    return this.executeQuery(sqlQuery)
  }
}

module.exports = new RestaurantsService()
