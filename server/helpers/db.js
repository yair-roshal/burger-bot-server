const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { sqlConfig } = require("../../constants/constants")

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    
    // console.log('config.database----------->>>>>>>', config.database)
    // console.log('sqlConfig----------->>>>>>>', sqlConfig) 
    // pool = mysql.createPool(sqlConfig) // Создаем пул соединений 
    // const connection = await mysql.createConnection(sqlConfig);
    console.log('{ host, port, user, password }', { host, port, user, password })
    // const connection = await mysql.createConnection({ host, port, user, password });
    const connection = await mysql.createConnection({ host, port, user, password, database });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {   host ,
    dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize);
    // db.User = require('../users/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}