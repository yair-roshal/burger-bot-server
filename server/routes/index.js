const express = require("express")
const router = express.Router()
const ordersRoutes = require("./orders.routes")
const dishesRoutes = require("./dishes.routes")
const settingsRoutes = require("./settings.routes") // Изменил название переменной на settingsRoutes

router.use("/", ordersRoutes)
router.use("/", dishesRoutes)
router.use("/", settingsRoutes) // Изменил настройки на settingsRoutes

module.exports = router
