const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/constants")
const axios = require("axios")
const https = require("https")

class OrdersService {
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

  // getOrders ================================================
  async getOrders() {
    const sqlQuery = "SELECT * FROM orders"
    return this.executeQuery(sqlQuery, [])
  }

  async createOrder(req, res) {
    const orderData = req.body
    const values = [
      orderData.queryId,
      JSON.stringify(orderData.cartItems),
      orderData.comment,
      orderData.totalPrice,
      orderData.address,
      orderData.optionDelivery,
      orderData.user_id,
      orderData.user_name,
      orderData.order_date,
      orderData.paymentMethod,
    ]

    // Ваш код для отправки запроса к другой службе
    try {
      const response = await axios.post("https://burgerim.ru:3000/pay_credit_card", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      console.log(`statusCode: ${response.status}`)
      console.log(response.data)
    } catch (error) {
      console.error("Error sending request to another service:", error)
      throw error
    }
  }

  // pay_credit_card ================================================
  async pay_credit_card(req, res) {
    // Ваш код для отправки запроса к другой службе
  }

  async create_order_db(req, res) {
    const orderData = req.body
    const values = [
      orderData.queryId,
      JSON.stringify(orderData.cartItems),
      orderData.comment,
      orderData.totalPrice,
      orderData.address,
      orderData.optionDelivery,
      orderData.user_id,
      orderData.user_name,
      orderData.order_date,
      orderData.paymentMethod,
    ]

    const sqlQuery = `INSERT INTO orders 
                      (queryId, cartItems, comment, totalPrice, address, optionDelivery, user_id, user_name, order_date, paymentMethod) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    return this.executeQuery(sqlQuery, values)
  }
}

module.exports = new OrdersService()
