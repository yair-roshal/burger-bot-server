import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import path from 'path';
import formatDate from './utils/formatDate';
import { startMainMenu_Production, only_keyboard_callToAdminMenu } from '../constants/menus';
import { text_html, text_html_CafeCafe } from '../constants/texts';

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

const menuENV = startMainMenu_Production;

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  const photoPathCafeCafe = path.join(__dirname, 'images', 'CafeCafe.png');

  try {
    await bot.sendPhoto(chatId, photoPathCafeCafe, startMainMenu_Production);
    console.log('Фотография успешно отправлена');
  } catch (error) {
    console.error('Ошибка при отправке фотографии:', error);
  }

  const optionsMessage = {
    parse_mode: 'HTML' as const,
    disable_web_page_preview: true,
  };

  bot.sendMessage(chatId, text_html_CafeCafe, optionsMessage);
});

bot.on('contact', (msg) => {
  if (chat_id_admin) {
    bot.sendMessage(
      chat_id_admin,
      `Message from ${msg.from?.first_name}  :
         ${msg.contact?.phone_number}`
    );
  }
});

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
        ...menuENV
      }
    );
  }
});

bot.on('webAppData', (webAppMes) => {
  console.log(webAppMes);
  console.log(webAppMes.web_app_data);
  bot.sendMessage(webAppMes.chat.id, `получили информацию из веб-приложения: ${webAppMes.web_app_data?.data}`);
});

export { bot };