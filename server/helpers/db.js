const config = require("config.json")
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const { sqlConfig } = require("../../constants/constants")

const db = {}

async function initialize() {
  const { host, port, user, password, database } = sqlConfig

  // console.log("sqlConfig----------->>>>>>>", sqlConfig)
  // console.log("database----------->>>>>>>", sqlConfig.database)

  const connection = await mysql.createConnection(sqlConfig)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
  })

  // init models and add them to the exported db object
  // db.User = require("../models/user.model")(sequelize)

  // Create a connection pool
  db.pool = mysql.createPool(sqlConfig)

  // Add a method to execute queries
  db.executeQuery = async (sqlQuery, values) => {
    const connection = await db.pool.getConnection()
    try {
      const [results] = await connection.execute(sqlQuery, values)
      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
      throw error
    } finally {
      connection.release()
    }
  }

  // sync all models with database
  await sequelize.sync()
}

initialize()

module.exports = db