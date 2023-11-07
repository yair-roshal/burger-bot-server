const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/config")
const axios = require("axios")
const https = require("https")
const { generateDateTime } = require("../helpers/utils")

class MenuService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig) // Создаем пул соединений
  }

  // Метод для выполнения запросов к базе данных
  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection()

    try {
      const [results] = await connection.execute(sqlQuery, values)
      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
      throw error
    } finally {
      connection.release() // Вернуть соединение в пул после использования
    }
  }

  // getMenu ================================================
  async getMenu() {
    const sqlQuery =
      // "SELECT * FROM Menu"
      `SELECT
      M.ID AS ID, 
      M.Title,
      M.Price,
      M.Image,
      M.Description,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'Title', T.Title,  
              'Price', T.Price,
              'Image', T.Image
            )
          )
        FROM Toppings T 
        WHERE T.DishID = M.ID
      ) AS toppings  
    FROM Menu M`
  
  
     return this.executeQuery(sqlQuery, [])
  }
}

module.exports = new MenuService()
