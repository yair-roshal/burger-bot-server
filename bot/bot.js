const TelegramBot = require('node-telegram-bot-api')
const chat_id_admin = process.env.CHAT_ID_ADMIN
 
const dotenv = require('dotenv')
dotenv.config()

// const token = '6545709213:AAGYnLVz279g_kuSq5NFIgfpM7wLlKe8R_0'

// const token = process.env.TELEGRAM_BOT_TOKEN

const token =
  process.env.NODE_ENV === "prod"
    ? process.env.TELEGRAM_BOT_TOKEN_prod
    : process.env.TELEGRAM_BOT_TOKEN
    // : process.env.TELEGRAM_BOT_TOKEN_dev

console.log('____________________________________________ :>> ')
console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
console.log('chat_id_admin :>> ', chat_id_admin)

// console.log('process.env.TELEGRAM_BOT_TOKEN_prod :>> ', process.env.TELEGRAM_BOT_TOKEN_prod)
console.log('token :>> ', token)

const bot = new TelegramBot(token, { polling: true })
const formatDate = require('./utils/formatDate.js')
// const bot_on_callback_query = require('./utils/bot_on_callback_query.js')

const {
  startMainMenu_Production,
  // callToAdminMenu,
  // give_me_keyboard,
  // only_inline_keyboard,
  only_keyboard_callToAdminMenu,
} = require('../constants/menus.js')

const menuENV = startMainMenu_Production

// const menuENV =
// process.env.NODE_ENV === "prod"
//   ? startMainMenu_Production
//   : process.env.NODE_ENV === "dev"
//   ? startMainMenu_Production
//   : startMainMenu_Production

const { text_html,text_html_CafeCafe } = require('../constants/texts.js')
// const { webAppUrl } = require("../constants/constants.js")

//=========================

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

  //sendPhoto work++++  ====================================================

  var photoPath = __dirname + '/images/PosterBurger.jpg'
  var photoPathCafeCafe = __dirname + '/images/CafeCafe.png'

  await bot
    .sendPhoto(chatId, photoPathCafeCafe, startMainMenu_Production)
    // .sendPhoto(chatId, photoPath, startMainMenu_Production)
    // .sendPhoto(chatId, photoPath)
    .then(() => {
      console.log('Фотография успешно отправлена')
    })
    .catch((error) => {
      console.error('Ошибка при отправке фотографии:', error.message)
    })

  //sendMessage work+++ ====================================================

  // var optionsMessage = {
  //   reply_markup: JSON.stringify(only_inline_keyboard),
  //   // startMainMenu_Production,
  //   parse_mode: "HTML",
  //   disable_web_page_preview: true, //disable because we don't want show description links
  // }

  // bot.sendMessage(chatId, text_html, optionsMessage)

  //testing ===============

  var optionsMessage = {
    // reply_markup: JSON.stringify(only_keyboard_callToAdminMenu),
    // startMainMenu_Production,
    parse_mode: 'HTML',
    disable_web_page_preview: true, //disable because we don't want show description links
  }

  bot.sendMessage(chatId, text_html_CafeCafe, optionsMessage)
  // bot.sendMessage(chatId, text_html, optionsMessage)
})

//=========================

// send message to admin with ask to add anything
bot.on('contact', (msg) => {
  bot.sendMessage(
    chat_id_admin,
    `Message from ${msg.from.first_name}  :
         ${msg.contact.phone_number}`
  )
})

//=========================

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id
//   const text = msg.text

//   // для обычных кнопок внизу бота===================================
// })

// callback_query ===========================================
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id
  const data = query.data

  if (data === 'auth') {
    const chatId = msg.chat.id
    bot.sendMessage(
      chatId,
      // text_html,
      text_html_CafeCafe,
      {
        parse_mode: 'HTML',
        //disable because we don't want show description links
        disable_web_page_preview: true,
      },
      menuENV
    )
  }

  // if (data === "test_pay") {
  //   const chatId = msg.chat.id
  //   const options = {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [
  //           {
  //             text: "Buy",
  //             pay: true,
  //           },
  //         ],
  //       ],
  //     },
  //   }

  //   bot.sendInvoice(
  //     chatId,
  //     "Title111",
  //     "Title222",
  //     "PAYMENTS_TOKEN",
  //     "some_invoice",
  //     "RUB",
  //     [{ label: "example", amount: 100 }],
  //     options
  //   )
  // }
})

//==========================================================

// ===========================================

// bot.onText(/\/buy/, (msg) => {
//   const chatId = msg.chat.id
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "Buy",
//             pay: true,
//           },
//         ],
//       ],
//     },
//   }
//   bot.sendInvoice(
//     chatId,
//     "Title",
//     "Title",
//     "PAYMENTS_TOKEN",
//     "some_invoice",
//     "RUB",
//     [{ label: "example", amount: 100 }],
//     options
//   )
// })

// bot.on("pre_checkout_query", (query) => {
//   bot.answerPreCheckoutQuery(query.id, true)
// })

// bot.on("successful_payment", (msg) => {
//   const chatId = msg.chat.id
//   bot.sendMessage(chatId, "Payment was successful!")
// })

//======================

bot.on('webAppData', (webAppMes) => {
  console.log(webAppMes) // вся информация о сообщении
  console.log(webAppMes.webAppData) // конкретно то, что мы передали в бота
  bot.sendMessage(webAppMes.chat.id, `получили информацию из веб-приложения: ${webAppMes.webAppData}`)
  // отправляем сообщение в ответ на отправку данных из веб-приложения
})

module.exports = { bot }
