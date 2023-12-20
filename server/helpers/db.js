const config = require("config.json")
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const { sqlConfig } = require("../../constants/sqlConfig")

module.exports = db = {}

initialize()

async function initialize() {
  const { host, port, user, password, database } = sqlConfig

  console.log("sqlConfig----------->>>>>>>", sqlConfig)
  console.log("database----------->>>>>>>", sqlConfig.database)

  const connection = await mysql.createConnection(sqlConfig)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
  })

  // init models and add them to the exported db object
  db.User = require("../models/user.model")(sequelize)

  // sync all models with database
  await sequelize.sync()
}
