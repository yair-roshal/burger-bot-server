require('dotenv').config()
//  require('dotenv').config({ path: './.env' })

var { bot } = require('./bot/bot')
var webServer = require('./server/server')

webServer(bot)
