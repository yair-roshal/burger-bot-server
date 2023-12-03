require("dotenv").config();

module.exports = {
  sqlConfig: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "burger_db",
  },
  
  
  
  
};
