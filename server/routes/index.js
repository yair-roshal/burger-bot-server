const express = require("express")
const router = express.Router()
const ordersRoutes = require("./orders.routes")
const dishesRoutes = require("./dishes.routes")
// const imagesRoutes = require("./images.routes")

router.use("/", ordersRoutes)
router.use("/", dishesRoutes)
// router.use("/images/", imagesRoutes)

module.exports = router
