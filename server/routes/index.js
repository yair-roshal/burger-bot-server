const express = require("express")
const router = express.Router()
const ordersRoutes = require("./orders.routes")
const menuRoutes = require("./menu.routes")

router.use("/", ordersRoutes)
router.use("/", menuRoutes)

module.exports = router
