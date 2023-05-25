const arrayBlockListSendingGPT = [
    '/start',
    '/add_feature',
    '/clean_context',
    'Clean context',
    'Hello!',
]
// const URL_BD = `http://localhost:3306`
const URL_BD = `http://localhost:${process.env.PORT}`

module.exports = { URL_BD, arrayBlockListSendingGPT }
