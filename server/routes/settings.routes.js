// settings.routes.js
const express = require("express")
const router = express.Router()
const SettingsController = require("../controllers/settings.controller.js")

router.route("/settings/:restaurant_id").get(SettingsController.getSettings)
router.route("/settings/:restaurant_id").put(SettingsController.updateSettings)

module.exports = router
