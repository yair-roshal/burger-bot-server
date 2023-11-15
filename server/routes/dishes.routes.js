//dishes.routers.js

const express = require("express")
const router = express.Router()
const DishesController = require("../controllers/dishes.controller.js")

router.route("/dishes").get(DishesController.getDishes)
router.route("/dishes/:restaurant_name").get(DishesController.getDishesByRestaurantName);
router.route("/dishes").post(DishesController.createDish); // Add this line for the createDish route

router.route("/toppings").get(DishesController.getToppings)
router.route("/toppings/:dish_id").get(DishesController.getToppingsByDishId);

router.route("/categories").get(DishesController.getCategories)

module.exports = router
