// const webAppUrl = "https://burger-web-app.netlify.app/"
const webAppUrl = "https://dev--burger-web-app.netlify.app/"

const optionsCloudinary = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
}

const cloudinaryConfig = {
  cloud_name: "dvb3cxb9h",
  api_key: "983895153435419",
  api_secret: "Poz4uTvsD0TKuZiXfAIT3Sk_9gc",
}

require("dotenv").config()

const devConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "burger_db",
  connectTimeout: 10000 // 10 seconds
}

const prodConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000 // 10 seconds

}

const sqlConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig
console.log("sqlConfig", sqlConfig)

module.exports = { webAppUrl, optionsCloudinary, cloudinaryConfig, sqlConfig }
