const translateText = require("../helpers/yandex_translate/translateText.js")

class TranslationsService {
  async createTranslation(req, res) {
    const { text } = req.body
 
    try {
      const en = await translateText(text, "en")
      const fr = await translateText(text, "fr")
      const he = await translateText(text, "he")
      const ru = await translateText(text, "ru")

      const allTranslations = { en, fr, he, ru }
      console.log("allTranslations :>> ", allTranslations)
      return allTranslations
    } catch (err) {
      console.log("err_translateText() : ", err)
    }
  }
}

module.exports = new TranslationsService()
