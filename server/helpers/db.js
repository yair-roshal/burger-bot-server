const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/constants")

const db = {}

async function initialize() {
  try {
    // Create a connection pool
    db.pool = mysql.createPool(sqlConfig)

    // Add a method to execute queries
    db.executeQuery = async function (sqlQuery, values) {
      let connection
      let retryCount = 0
      const maxRetries = 3

      while (retryCount < maxRetries) {
        try {
          connection = await this.pool.getConnection()
          const [results] = await connection.execute(sqlQuery, values)
          // console.error('Executing SQL query was success - results :', results);
          console.error("Executing SQL query was success  ")
          return results
        } catch (error) {
          if (error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED") {
            retryCount++
            console.error(
              `Error executing SQL query (attempt ${retryCount}/${maxRetries}): ${error}`
            )
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * retryCount)
            ) // Exponential backoff
          } else if (error.code === "EHOSTUNREACH") {
            console.error(
              "Error: Host unreachable. Please check your internet connection."
            )
            throw error
          } else {
            console.error("Error executing SQL query:", error)
            throw error
          }
        } finally {
          if (connection) connection.release()
        }
      }

      throw new Error("Failed to execute SQL query after max retries")
    }
  } catch (error) {
    console.error("Error initializing the database connection:", error)
    throw error
  }
}

initialize()

module.exports = db
