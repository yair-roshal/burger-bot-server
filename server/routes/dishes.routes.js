//dishes.routers.js

const express = require("express")
const router = express.Router()
const DishesController = require("../controllers/dishes.controller.js")

router.route("/dishes").get(DishesController.getDishes)
router.route("/dishes/:restaurant_id").get(DishesController.getDishesByRestaurantId);
router.route("/dishes").post(DishesController.createDish); // Add this line for the createDish route

router.route("/toppings").get(DishesController.getToppings)
router.route("/toppings/:restaurant_id").get(DishesController.getToppingsByRestaurantId);
router.route("/toppings/:restaurant_id").post(DishesController.createTopping);  


router.route("/categories").get(DishesController.getCategories)

module.exports = router
