require('dotenv').config();

console.log('DB_HOST', process.env.DB_HOST)

module.exports = {
  sqlConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'burger_db',
  },
  
};
