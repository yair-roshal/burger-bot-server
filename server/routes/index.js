const express = require("express")
const router = express.Router()
const ordersRoutes = require("./orders.routes")
const menuRoutes = require("./menu.routes")
const imagesRoutes = require("./images.routes")

router.use("/", ordersRoutes)
router.use("/", menuRoutes)
router.use("/images/", imagesRoutes)

module.exports = router
