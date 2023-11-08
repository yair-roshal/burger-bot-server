const express = require("express")
const router = express.Router()
const MenuController = require("../controllers/menu.controller.js")

router.route("/menu").get(MenuController.getMenu)
router.route("/toppings").get(MenuController.getToppings)
router.route("/categories").get(MenuController.getCategories)

module.exports = router
