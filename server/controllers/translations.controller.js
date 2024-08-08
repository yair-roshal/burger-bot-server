const TranslationsService = require("../services/translations.service.js")

class TranslationsController {
  async createTranslation(req, res) {
    const result = await TranslationsService.createTranslation(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-createTranslation" })
  }
}

module.exports = new TranslationsController()
