const TelegramBot = require('node-telegram-bot-api')
const token =
    process.env.NODE_ENV === 'prod'
        ? process.env.TELEGRAM_BOT_TOKEN
        : process.env.TELEGRAM_BOT_TOKEN_testing

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV)
const bot = new TelegramBot(token, { polling: true })
// const chatIdAdmin = process.env.CHAT_ID_ADMIN
const formatDate = require('./utils/formatDate.js')
// const bot_on_callback_query = require('./utils/bot_on_callback_query.js')

const {
    settings_message,

    startMainMenu_Production,
    startMainMenu_Testing,
    inline_keyboard,
    callToAdminMenu,
} = require('../constants/menus.js')
const { text_message_html } = require('../constants/texts.js')

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id

    var photoPath = __dirname + '/images/burger.png'
    console.log('photoPath :>> ', photoPath)

    // var optionsMessage = {
    //     caption: `Hello this is Burger Shop!!!`,
    //     reply_markup: JSON.stringify(
    //         process.env.NODE_ENV === 'prod' ? startMainMenu_Production : startMainMenu_Testing,
    //     ),
    // }

    bot.sendPhoto(chatId, photoPath, startMainMenu_Testing)
        .then(() => {
            console.log('Фотография успешно отправлена')
        })
        .catch((error) => {
            console.error('Ошибка при отправке фотографии:', error.message)
        })

    // await bot.sendPhoto(chatId, photoPath, optionsMessage)

    // process.env.NODE_ENV === 'prod'
    //     ? await bot.sendMessage(
    //           chatId,
    //           text_message_html,
    //           settings_message,
    //           startMainMenu_Production,
    //       )
    //     : await bot.sendMessage(chatId, text_message_html, settings_message, startMainMenu_Testing)
})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id

    console.log('msg?.web_app_data :>> ', msg?.web_app_data)

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log('data==', data)

            await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате')
            }, 3000)
        } catch (e) {
            console.log(e)
        }
    }
})

// app.post('/web-data', async (req, res) => {
//      const { products = [], totalPrice, queryId } = req.body

//     try {
//         await bot.answerWebAppQuery(queryId, {
//             type: 'article',
//             id: queryId,
//             title: 'Успешная покупка',
//             input_message_content: {
//                 message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
//                     .map((item) => item.title)
//                     .join(', ')}`,
//             },
//         })
//         return res.status(200).json({})
//     } catch (e) {
//         return res.status(500).json({})
//     }
// })

//send message to admin with ask to add anything
bot.on('contact', (msg) => {
    bot.sendMessage(
        chatIdAdmin,
        `Message from ${msg.from.first_name}  :
         ${msg.contact.phone_number}`,
    )
})

//===========================================

bot.onText(/\/buy/, (msg) => {
    const chatId = msg.chat.id
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Buy',
                        pay: true,
                    },
                ],
            ],
        },
    }
    bot.sendInvoice(
        chatId,
        'Title',
        'Title',
        'PAYMENTS_TOKEN',
        'some_invoice',
        'RUB',
        [{ label: 'example', amount: 100 }],
        options,
    )
})

bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true)
})

bot.on('successful_payment', (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Payment was successful!')
})

//===========================================

// callback_query
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id

    // console.log('bot.on callback_query   ---------------:>> ', query)
    const data = query.data

    if (data === 'about') {
        const chatId = msg.chat.id
        bot.sendMessage(
            chatId,
            text_message_html,
            {
                parse_mode: 'HTML',
                //disable because we don't want show description links
                disable_web_page_preview: true,
            },
            startAlwaysMenu_2buttons,
        )
    }
    if (data === 'open_menu') {
        const chatId = msg.chat.id
        bot.sendMessage(
            chatId,
            text_message_html,
            {
                parse_mode: 'HTML',
                //disable because we don't want show description links
                disable_web_page_preview: true,
            },
            startAlwaysMenu_2buttons,
        )
    }
})

module.exports = { bot }
