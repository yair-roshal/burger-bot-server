require("dotenv").config();
//  require('dotenv').config({ path: './.env' })

var { bot } = require("./bot/bot");
var webServer = require("./server/server");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// const token =
//   process.env.NODE_ENV === "prod"
//     ? process.env.TELEGRAM_BOT_TOKEN_prod
//     : process.env.TELEGRAM_BOT_TOKEN_dev;

if (process.env.NODE_ENV === "prod") {
  console.log("1111");
  webServer(bot);
} else if (process.env.NODE_ENV === "dev") {
  console.log("2222");

  webServer();
}

// webServer(bot);
