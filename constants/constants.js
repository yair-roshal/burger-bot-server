const arrayBlockListSendingGPT = [
  "/start",
  "/add_feature",
  "/clean_context",
  "Clean context",
  "Hello!",
]
// const URL_BD = `http://localhost:3306`
const URL_BD = `http://localhost:${process.env.PORT}`

// const webAppUrl = 'https://burger-app-heroku-9654db42ebb1.herokuapp.com/'
const webAppUrl = "https://heroic-puffpuff-e7da0d.netlify.app"

module.exports = { URL_BD, arrayBlockListSendingGPT, webAppUrl }
