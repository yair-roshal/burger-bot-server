const TelegramBot = require("node-telegram-bot-api")
CHAT_ID_ADMIN = 386212074

const dotenv = require("dotenv")
dotenv.config()

const token =
  process.env.NODE_ENV === "prod"
    ? process.env.TELEGRAM_BOT_TOKEN_prod
    : process.env.TELEGRAM_BOT_TOKEN_dev

console.log("____________________________________________ :>> ")
console.log("process.env.NODE_ENV :>> ", process.env.NODE_ENV)
console.log(
  "process.env.TELEGRAM_BOT_TOKEN_prod :>> ",
  process.env.TELEGRAM_BOT_TOKEN_prod
)
console.log("token :>> ", token)

const bot = new TelegramBot(token, { polling: true })
const formatDate = require("./utils/formatDate.js")
// const bot_on_callback_query = require('./utils/bot_on_callback_query.js')

const {
  startMainMenu_Production,
  callToAdminMenu,
  give_me_keyboard,
  only_keyboard,
} = require("../constants/menus.js")

const menuENV = startMainMenu_Production

// const menuENV =
// process.env.NODE_ENV === "prod"
//   ? startMainMenu_Production
//   : process.env.NODE_ENV === "dev"
//   ? startMainMenu_Production
//   : startMainMenu_Production

const { text_html } = require("../constants/texts.js")
const { webAppUrl } = require("../constants/constants.js")

//=========================

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

  //sendPhoto work++++  ====================================================

  var photoPath = __dirname + "/images/PosterBurger.jpg"

  await bot
    .sendPhoto(chatId, photoPath, startMainMenu_Production)
    // .sendPhoto(chatId, photoPath)
    .then(() => {
      console.log("Фотография успешно отправлена")
    })
    .catch((error) => {
      console.error("Ошибка при отправке фотографии:", error.message)
    })

  //sendMessage not html --- ====================================================

  bot.sendMessage(chatId, text_html, startMainMenu_Production)

  //sendMessage not button --- ====================================================

  var optionsMessage = {
    // startMainMenu_Production,
    reply_markup: JSON.stringify(only_keyboard),

    parse_mode: "HTML",
    disable_web_page_preview: true, //disable because we don't want show description links
  }

  bot.sendMessage(chatId, text_html, optionsMessage)

  //sendMessage work+++ ====================================================

  // const keyboard = {
  //   inline_keyboard: [
  //     [
  //       {
  //         text: "Open Menu",
  //         web_app: { url: webAppUrl },
  //       },
  //     ],
  //   ],
  // }

  bot.sendMessage(chatId, text_html, {
    reply_markup: JSON.stringify(only_keyboard),
    // reply_markup: JSON.stringify(keyboard),
    parse_mode: "HTML",
  })
})

//=========================

// send message to admin with ask to add anything
bot.on("contact", (msg) => {
  bot.sendMessage(
    CHAT_ID_ADMIN,
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
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id
  const data = query.data

  if (data === "auth") {
    const chatId = msg.chat.id
    bot.sendMessage(
      chatId,
      text_html,
      {
        parse_mode: "HTML",
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

// bot.on("webAppData", (webAppMes) => {
//   console.log(webAppMes) // вся информация о сообщении
//   console.log(webAppMes.webAppData) // конкретно то, что мы передали в бота
//   bot.sendMessage(
//     webAppMes.chat.id,
//     `получили информацию из веб-приложения: ${webAppMes.webAppData}`
//   )
//   // отправляем сообщение в ответ на отправку данных из веб-приложения
// })

module.exports = { bot }
