import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import path from 'path';
import { startMainMenu_Production } from '../constants/menus';
import {  text_html_CafeCafe } from '../constants/texts';

dotenv.config();

const chat_id_admin = process.env.CHAT_ID_ADMIN;

const token = process.env.NODE_ENV === "prod"
  ? process.env.TELEGRAM_BOT_TOKEN_prod
  : process.env.TELEGRAM_BOT_TOKEN;

console.log('____________________________________________');
console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
console.log('chat_id_admin :>> ', chat_id_admin);
console.log('token :>> ', token);

const bot = new TelegramBot(token!, { polling: true });

// Ensure menuENV is correctly typed
const menuENV: TelegramBot.SendMessageOptions = {
  parse_mode: 'HTML',
  disable_web_page_preview: true,
  reply_markup: startMainMenu_Production.reply_markup as TelegramBot.InlineKeyboardMarkup | TelegramBot.ReplyKeyboardMarkup | TelegramBot.ReplyKeyboardRemove | TelegramBot.ForceReply,
};

// Handle /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const photoPathCafeCafe = path.join(__dirname, 'images', 'CafeCafe.png');

  try {
    // Send photo with options
    const sendPhotoOptions: TelegramBot.SendPhotoOptions = {
      caption: 'Welcome to CafeCafe!', // Customize caption as needed
      reply_markup: menuENV.reply_markup as TelegramBot.InlineKeyboardMarkup | TelegramBot.ReplyKeyboardMarkup | TelegramBot.ReplyKeyboardRemove | TelegramBot.ForceReply,
    };

    await bot.sendPhoto(chatId, photoPathCafeCafe, sendPhotoOptions);
    console.log('Photo successfully sent');
  } catch (error) {
    console.error('Error sending photo:', error);
  }

  // Send message with options
  bot.sendMessage(chatId, text_html_CafeCafe, menuENV);
});

// Handle contact sharing
bot.on('contact', (msg) => {
  if (chat_id_admin) {
    bot.sendMessage(
      chat_id_admin,
      `Message from ${msg.from?.first_name}:\nPhone number: ${msg.contact?.phone_number}`
    );
  }
});

// Handle callback queries
bot.on('callback_query', (query) => {
  if (!query.message) return;

  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'auth') {
    bot.sendMessage(
      chatId,
      text_html_CafeCafe,
      {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: menuENV.reply_markup as TelegramBot.InlineKeyboardMarkup | TelegramBot.ReplyKeyboardMarkup | TelegramBot.ReplyKeyboardRemove | TelegramBot.ForceReply
      }
    );
  }
});

// Handle messages with web app data
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const webAppData = msg.web_app_data.data;
    console.log(webAppData); // Log data received from the web app

    // Send data to admin chat
    if (chat_id_admin) {
      bot.sendMessage(chat_id_admin, `Received data from web app: ${webAppData}`);
    }
  }
});

export { bot };