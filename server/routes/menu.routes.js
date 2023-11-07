const express = require("express")
const router = express.Router()
const MenuController = require("../controllers/menu.controller.js")

router.route("/menu").get(MenuController.getMenu)

module.exports = router
