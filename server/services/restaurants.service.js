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

  async getUserRestaurant(req, res) {
    const user_sub = req.params.user_sub;
    const sqlQuery = `
      SELECT * FROM restaurants WHERE user_sub = ?
    `;
    return this.executeQuery(sqlQuery, [user_sub]);
  }

  async createRestaurant(userSub) {
    try {
      let sqlQuery = `
        INSERT INTO restaurants (user_sub) VALUES (?)
      `;
      const results = await this.executeQuery(sqlQuery, [userSub]);
      const restaurant_id = results.insertId;

      sqlQuery = `
        INSERT INTO settings (restaurant_id) VALUES (?)
      `;
      await this.executeQuery(sqlQuery, [restaurant_id]);

      return { id: restaurant_id };
    } catch (error) {
      console.error("Error creating restaurant:", error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new RestaurantsService()
