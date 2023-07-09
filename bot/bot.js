const TelegramBot = require("node-telegram-bot-api")
const token =
  process.env.NODE_ENV === "prod"
    ? process.env.TELEGRAM_BOT_TOKEN
    : process.env.TELEGRAM_BOT_TOKEN_testing

console.log("process.env.NODE_ENV :>> ", process.env.NODE_ENV)
console.log("token :>> ", token)
const bot = new TelegramBot(token, { polling: true })
// const chatIdAdmin = process.env.CHAT_ID_ADMIN
const formatDate = require("./utils/formatDate.js")
// const bot_on_callback_query = require('./utils/bot_on_callback_query.js')

const {
  // settings_message,
  startMainMenu_Production,
  startMainMenu_Testing,
  // inline_keyboard,
  // callToAdminMenu,
} = require("../constants/menus.js")

const menu =
  process.env.NODE_ENV === "prod"
    ? startMainMenu_Production
    : startMainMenu_Testing

const { text_message_html } = require("../constants/texts.js")
const { webAppUrl } = require("../constants/constants.js")

//=========================

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

  var photoPath = __dirname + "/images/PosterBurger.jpg"
  console.log("photoPath :>> ", photoPath)

  bot
    .sendPhoto(chatId, photoPath, menu)
    .then(() => {
      console.log("Фотография успешно отправлена")
    })
    .catch((error) => {
      console.error("Ошибка при отправке фотографии:", error.message)
    })

  //==================================
  await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
    reply_markup: {
      keyboard: [
        [{ text: "Menu", web_app: { url: webAppUrl } }],
        // [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
      ],
    },
  })

  // process.env.NODE_ENV === 'prod'
  //     ? await bot.sendMessage(
  //           chatId,
  //           text_message_html,
  //           settings_message,
  //           startMainMenu_Production,
  //       )
})

//=========================

bot.on("message", async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text

  console.log("msg?.web_app_data?.data :>> ", msg?.web_app_data?.data)

  // для обычных кнопок внизу бота===================================

  if (msg?.web_app_data?.data) {
    // const data = {
    //   queryId,
    //   products: cartItems,
    //   totalPrice: getTotalPrice(cartItems),
    // }

    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      console.log("data==", data)

      for (const item of data.products) {
        const totalPrice = item.price * item.quantity
        const message =
          "Вы заказали: " +
          item.title +
          " * " +
          item.quantity +
          " = " +
          totalPrice +
          " $"
        await bot.sendMessage(chatId, message)
      }

      // data.products.forEach(async (item) => {
      //   await bot.sendMessage(
      //     chatId,
      //     "вы заказали: " +
      //       item.title +
      //       " * " +
      //       item.quantity +
      //       " = " +
      //       item.price * item.quantity +
      //       " $"
      //   )
      // })

      await bot.sendMessage(chatId, "Total price: " + data?.totalPrice)

      setTimeout(async () => {
        await bot.sendMessage(chatId, "Thanks! Your order №14846")
      }, 3000)
    } catch (e) {
      console.log(e)
    }
  }

  // if (msg?.web_app_data?.data) {
  //   try {
  //     const data = JSON.parse(msg?.web_app_data?.data)
  //     console.log("data==", data)

  //     await bot.sendMessage(chatId, "Спасибо за обратную связь!")
  //     // await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
  //     // await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)

  //     setTimeout(async () => {
  //       await bot.sendMessage(chatId, "Всю информацию вы получите в этом чате")
  //     }, 3000)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
})

// callback_query ===========================================
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id

  // console.log('bot.on callback_query   ---------------:>> ', query)
  const data = query.data

  if (data === "about") {
    const chatId = msg.chat.id
    bot.sendMessage(
      chatId,
      text_message_html,
      {
        parse_mode: "HTML",
        //disable because we don't want show description links
        disable_web_page_preview: true,
      },
      menu
    )
  }

  if (data === "test_pay") {
    const chatId = msg.chat.id
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Buy",
              pay: true,
            },
          ],
        ],
      },
    }
    bot.sendInvoice(
      chatId,
      "Title111",
      "Title222",
      "PAYMENTS_TOKEN",
      "some_invoice",
      "RUB",
      [{ label: "example", amount: 100 }],
      options
    )
  }
})

//==========================================================

// send message to admin with ask to add anything
bot.on("contact", (msg) => {
  bot.sendMessage(
    chatIdAdmin,
    `Message from ${msg.from.first_name}  :
         ${msg.contact.phone_number}`
  )
})

// ===========================================

bot.onText(/\/buy/, (msg) => {
  const chatId = msg.chat.id
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Buy",
            pay: true,
          },
        ],
      ],
    },
  }
  bot.sendInvoice(
    chatId,
    "Title",
    "Title",
    "PAYMENTS_TOKEN",
    "some_invoice",
    "RUB",
    [{ label: "example", amount: 100 }],
    options
  )
})

// Подскажите, пожалуйста, как сделать отправку данных как в офф примере @durgerkingbot?

// Надо вызвать метод answerWebAppQuery. Аргументом передать query_id полученный из initData. В качестве result использовать InlineQueryResultArticle.

//Как я и сказал: получить его на фронте с помощью JS-скрипта Telegram из initData. Далее отправить любым удобным способом на ваш бек средствами того же JS. Подобная интеграция не простая и требует полноценный API, который умеет общаться с фронтом, Bot API тут не обойтись.

bot.on("pre_checkout_query", (query) => {
  bot.answerPreCheckoutQuery(query.id, true)
})

bot.on("successful_payment", (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, "Payment was successful!")
})

//======================

bot.on("webAppData", (webAppMes) => {
  console.log(webAppMes) // вся информация о сообщении
  console.log(webAppMes.webAppData) // конкретно то, что мы передали в бота
  bot.sendMessage(
    webAppMes.chat.id,
    `получили информацию из веб-приложения: ${webAppMes.webAppData}`
  )
  // отправляем сообщение в ответ на отправку данных из веб-приложения
})

module.exports = { bot }
