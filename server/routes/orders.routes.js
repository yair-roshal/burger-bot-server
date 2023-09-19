const express = require("express")
const router = express.Router()
const OrderController = require("../controllers/orders.controller.js")

// router
//     .route('/:user')
//     .get(OrderController.getOrders)
//     .post(OrderController.createOrder)
//     .delete(OrderController.deleteTable)

router
  .route("/orders")
  // .route('/:user/:request_id')
  // .route('/:user/:id')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder)

// .put(OrderController.updateOrder)
// .delete(OrderController.deleteOrder)

router.route("/pay_credit_card").post(OrderController.pay_credit_card)

module.exports = router
