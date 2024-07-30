const db = require("../helpers/db")

class RestaurantsService {
  async getRestaurant(req, res) {
    const restaurant_id = req.params.restaurant_id

    const sqlQuery = `
      SELECT
        id,
        name
       FROM restaurants
      WHERE id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async getRestaurants(req, res) {
    const sqlQuery = `
      SELECT
        id,
        name
       FROM restaurants
     `
    return db.executeQuery(sqlQuery)
  }

  async getUserRestaurant(req, res) {
    console.log("req.params.user_sub ", req.params.user_sub)
    console.log(
      "decodeURIComponent(req.params.user_sub) :>> ",
      decodeURIComponent(req.params.user_sub)
    )

    const user_sub = decodeURIComponent(req.params.user_sub)

    const sqlQuery = `
      SELECT * FROM restaurants WHERE user_sub = ?
    `
    return db.executeQuery(sqlQuery, [user_sub])
  }

  async createRestaurant(userSub) {
    try {
      let sqlQuery = `
        INSERT INTO restaurants (user_sub) VALUES (?)
      `
      const results = await db.executeQuery(sqlQuery, [userSub])
      const restaurant_id = results.insertId

      sqlQuery = `
        INSERT INTO settings (restaurant_id) VALUES (?)
      `
      await db.executeQuery(sqlQuery, [restaurant_id])

      return { id: restaurant_id }
    } catch (error) {
      console.error("Error creating restaurant:", error)
      throw new Error("Internal Server Error")
    }
  }
}

module.exports = new RestaurantsService()
