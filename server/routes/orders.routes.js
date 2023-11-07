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

 

router.route("/pay_credit_card").post(OrderController.pay_credit_card)
router.route("/create_order_db").post(OrderController.create_order_db)

module.exports = router
