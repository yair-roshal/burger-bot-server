const constants = require("../../constants/constants")
const mysql = require("mysql2/promise")

class OrdersService {
  async createOrder(req, res) {
    const orderData = req.body // Assuming req.body contains the order data

    try {
      const sqlQuery = `INSERT INTO orders 
                        (queryId, cartItems, comment, totalPrice, address, optionDelivery, user_id, user_name, order_date, paymentMethod) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

      const connection = await mysql.createConnection({
        host: "194.31.175.248", // Replace with your IP address
        port: 3306, // Replace with your port
        user: "gen_user", // Replace with your username
        password: "w07613vrm1", // Replace with your password
        database: "burger_db", // Replace with your database name
      })

      const values = [
        orderData.queryId,
        JSON.stringify(orderData.cartItems), // Convert cartItems to a JSON string
        orderData.comment,
        orderData.totalPrice,
        orderData.address,
        orderData.optionDelivery,
        orderData.user_id,
        orderData.user_name,
        orderData.order_date,
        orderData.paymentMethod,
      ]

      const [results] = await connection.execute(sqlQuery, values)

      console.log("New order saved to DB:", results)

      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
      throw error // Re-throw the error to handle it elsewhere if needed
    }
  }
}

module.exports = new OrdersService()
