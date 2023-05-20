const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const cors = require('cors')

// require('dotenv').config()
require('dotenv').config({ path: './.env' })
// require('dotenv').config({ path: '../.env' })

// const token =
//     process.env.NODE_ENV === 'prod'
//         ? process.env.TELEGRAM_BOT_TOKEN
//         : process.env.TELEGRAM_BOT_TOKEN_testing
const chatIdAdmin = process.env.CHAT_ID_ADMIN

const token = process.env.TELEGRAM_BOT_TOKEN_testing
// const HOST = process.env.HOST
// const PORT = process.env.PORT

// const token = '6134674568:AAEOCLFEBqjHhz82wa6AZqXuIrxgD3YECbU'

console.log('token :>> ', token)

const webAppUrl = 'https://serene-moonbeam-93eead.netlify.app'

const bot = new TelegramBot(token, { polling: true })
const app = express()

app.use(express.json())
app.use(cors())

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id

    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Заполнить форму',
                        web_app: { url: webAppUrl + '/form' },
                    },
                ],
            ],
        },
    })

    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Сделать заказ',
                        web_app: { url: webAppUrl },
                    },
                ],
            ],
        },
    })
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

app.post('/web-data', async (req, res) => {
    console.log('req.body :>> ', req.body)
    const { products = [], totalPrice, queryId } = req.body

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
                    .map((item) => item.title)
                    .join(', ')}`,
            },
        })
        return res.status(200).json({})
    } catch (e) {
        return res.status(500).json({})
    }
})

// send message to admin with ask to add anything
bot.on('contact', (msg) => {
    bot.sendMessage(
        chatIdAdmin,
        `Message from ${msg.from.first_name}  :
         ${msg.contact.phone_number}`,
    )
})

// let PORT = '8000'
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Web server started at port : ', PORT)
})
