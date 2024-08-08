const axios = require("axios")
const refreshTokenIAM = require("../helpers/yandex_translate/refreshTokenIAM")
const getTokenJWT = require("../helpers/yandex_translate/getTokenJWT.js")
const changeTokenToIAM = require("../helpers/yandex_translate/changeTokenToIAM.js")
const translateText = require("../helpers/yandex_translate/translateText.js")

async function getIAMToken() {
  const tokenJWT = await getTokenJWT()
  return await changeTokenToIAM({ jwt: tokenJWT })
}

class TranslationsService {
  async createTranslation(req, res) {
    const IAM_TOKEN = await getIAMToken()

    const { text } = req.body

    try {
      const translatedText = await translateText(text, IAM_TOKEN)

      console.log("translatedText :>> ", translatedText)
      return translatedText
    } catch (err) {
      console.log("err_translateText() : ", err)
    }
  }
}

module.exports = new TranslationsService()
