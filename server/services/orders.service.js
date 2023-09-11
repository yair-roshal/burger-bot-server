const constants = require("../../constants/constants")

const mysql = require("mysql2/promise")

class OrdersService {
  constructor() {
    this.pool = mysql.createPool(constants.sqlConfig)
  }

  async runQuery(sqlQuery, values) {
    try {
      const connection = await this.pool.getConnection()
      const [results] = await connection.query(sqlQuery, values)
      connection.release()
      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
    }
  }

  async createOrder(data) {
    const tableName = "orders"
    const sqlQuery = `INSERT INTO ${tableName} SET ?`

    try {
      let order = { ...data }
      
    //   queryId,
    //   userId: user.id,
    //   username: user.username,
    //   cartItems,
    //   comment,
    //   totalPrice,
    //   address,
    //   optionDelivery,
      
      console.log('order_createOrder', order)

      const results = await this.runQuery(sqlQuery, order)

      console.log("New order posted after translate", order)

      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
    }
  }
}

module.exports = new OrdersService()
