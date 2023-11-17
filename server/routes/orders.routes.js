const express = require("express")
const router = express.Router()
const OrderController = require("../controllers/orders.controller.js")

router.route("/orders").get(OrderController.getOrders)

router.route("/pay_credit_card").post(OrderController.pay_credit_card)
router.route("/create_order_db").post(OrderController.create_order_db)

module.exports = router
