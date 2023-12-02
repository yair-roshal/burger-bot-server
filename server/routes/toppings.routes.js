//toppings.routers.js
const express = require("express");
const router = express.Router();
const ToppingsController = require("../controllers/toppings.controller.js");

router.route("/toppings/:restaurant_id").get(ToppingsController.getToppings);
router.route("/toppings").post(ToppingsController.createTopping);
router.route("/toppings/:topping_id").put(ToppingsController.updateTopping);
router.route("/toppings/:topping_id").delete(ToppingsController.deleteTopping);

module.exports = router;
