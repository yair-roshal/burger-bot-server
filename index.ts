import dotenv from 'dotenv';
import { bot } from './bot/bot';
import webServer from './server/server';

dotenv.config();

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// const token =
//   process.env.NODE_ENV === "prod"
//     ? process.env.TELEGRAM_BOT_TOKEN_prod
//     : process.env.TELEGRAM_BOT_TOKEN_dev;

if (process.env.NODE_ENV === "prod") {
  console.log(`process.env.NODE_ENV === "prod"`);
  webServer(bot);
} else if (process.env.NODE_ENV === "dev") {
  console.log(`process.env.NODE_ENV === "dev"`);
  webServer();
}