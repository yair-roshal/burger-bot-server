const express = require("express"),
  router = express.Router(),
  ordersRoutes = require("./orders.routes"),
  menuRoutes = require("./menu.routes")

router.use("/", ordersRoutes)
router.use("/", menuRoutes)

module.exports = router
