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
      "SELECT * FROM Menu"
      // "SELECT * FROM Menu LEFT JOIN Toppings ON Menu.ID = Toppings.DishID"
    return this.executeQuery(sqlQuery, [])
  }
}

module.exports = new MenuService()
