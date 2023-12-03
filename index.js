require('dotenv').config()
//  require('dotenv').config({ path: './.env' })

var { bot } = require('./bot/bot')
var webServer = require('./server/server')


console.log('process.env.NODE_ENV', process.env.NODE_ENV)

// const token =
//   process.env.NODE_ENV === "prod"
//     ? process.env.TELEGRAM_BOT_TOKEN_prod
//     : process.env.TELEGRAM_BOT_TOKEN_dev



webServer(bot)
