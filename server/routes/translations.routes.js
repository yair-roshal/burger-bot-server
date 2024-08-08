const express = require("express")
const router = express.Router()
const TranslationsController = require("../controllers/translations.controller.js")

router.post("/translations", TranslationsController.createTranslation)

module.exports = router
