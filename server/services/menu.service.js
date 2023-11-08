const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/config")
const axios = require("axios")
const https = require("https")
const { generateDateTime } = require("../helpers/utils")

class menuService {
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
      // "SELECT * FROM menu"
      `SELECT
      m.id AS id, 
      m.title,
      m.price,
      m.image,
      m.description,
      (
        SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'title', t.title,  
              'price', t.price,
              'image', t.image
            )
          )
        FROM toppings t 
        WHERE t.dish_id = m.id
      ) AS toppings  
    FROM menu m`
  
  
     return this.executeQuery(sqlQuery, [])
  }
}

module.exports = new menuService()
