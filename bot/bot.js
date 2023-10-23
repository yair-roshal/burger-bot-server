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
} = require("../constants/menus.js")

const menuENV = startMainMenu_Production

// const menuENV =
// process.env.NODE_ENV === "prod"
//   ? startMainMenu_Production
//   : process.env.NODE_ENV === "dev"
//   ? startMainMenu_Production
//   : startMainMenu_Production

const { text_message_html } = require("../constants/texts.js")
const { webAppUrl } = require("../constants/constants.js")

// callback_query ===============================================
bot.on("callback_query", (query) => {
  const chatId = query.from.id
  // console.log('query ---------------:>> ', query)

  if (query.data === "give_me") {
    // sendingWordMessage(dictionary, bot, chatId)
  }
})

//=========================

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

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

  var optionsMessage = {
    caption: `
    <b>Welcome to the BurgerBot 🍔🍔🍔 </b> 
    🔥 To order and open the menu, click on the blue button at the bottom left 👇🏻👇🏻👇🏻
     `,
    reply_markup: JSON.stringify(give_me_keyboard),
  }

  // await bot.sendPhoto(chatId, photoPath, optionsMessage)

  const text = `
  <b>Welcome to the BurgerBot 🍔🍔🍔 </b> 
  🔥 To order and open the menu, click on the blue button at the bottom left 👇🏻👇🏻👇🏻
   `
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "Open Web App",
          web_app: { url: webAppUrl },
        },
      ],
    ],
  }

  // web_app: { url: webAppUrl },

  bot.sendMessage(chatId, text, {
    reply_markup: JSON.stringify(keyboard),
  })

  // bot
  //   .sendMessage(
  //     chatId,
  //     text_message_html,
  //     {
  //       parse_mode: "HTML",
  //       disable_web_page_preview: true, //disable because we don't want show description links
  //       startMainMenu_Production
  //     },

  //   )
  //   .then(() => {
  //     console.log("Keyboard successfully displayed")
  //   })
  //   .catch((error) => {
  //     console.error("Error displaying keyboard:", error.message)
  //   })

  bot
    .sendMessage(
      chatId,
      `
    <b>Welcome to the BurgerBot 🍔🍔🍔 </b> 
    🔥 To order and open the menu, click on the blue button at the bottom left 👇🏻👇🏻👇🏻
     `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "click to open menu",
                callback_data: "auth",
                web_app: { url: webAppUrl },
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },

        // parse_mode: "HTML",
        // disable_web_page_preview: true, //disable because we don't want show description links

        // reply_markup: {
        //   keyboard: [
        //     [
        //       {
        //         text: "Contact the admin",
        //         request_contact: true,
        //       },
        //     ],
        //   ],
        //   resize_keyboard: true, // Разрешить изменение размера клавиатуры
        //   one_time_keyboard: false, // Не скрывать клавиатуру после нажатия на кнопку
        // },
      }
    )
    .then(() => {
      console.log("Keyboard successfully displayed")
    })
    .catch((error) => {
      console.error("Error displaying keyboard:", error.message)
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
      text_message_html,
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
