const config = require("config.json")
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const { sqlConfig } = require("../../constants/constants")

const db = {}

async function initialize() {
  const { host, port, user, password, database } = sqlConfig

  const connection = await mysql.createConnection(sqlConfig)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
  })

  // Create a connection pool
  db.pool = mysql.createPool(sqlConfig)

  // Add a method to execute queries
  db.executeQuery = async function(sqlQuery, values) {
    let connection
    try {
      connection = await this.pool.getConnection()
      const [results] = await connection.execute(sqlQuery, values)
      console.error(
        "GroupsService --Executing SQL query was success - results :",
        results
      )
      return results
    } catch (error) {
      console.log("error.code :>> ", error.code)
      if (error.code === "EHOSTUNREACH") {
        console.error(
          "Error: Host unreachable. Please check your internet connection."
        )
      } else {
        console.error("Error executing SQL query:", error)
      }
      throw error
    } finally {
      if (connection) connection.release()
    }
  }

  // sync all models with database
  await sequelize.sync()
}

initialize()

module.exports = db