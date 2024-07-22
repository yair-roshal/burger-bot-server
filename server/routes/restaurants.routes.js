const express = require("express")
const router = express.Router()
const RestaurantsController = require("../controllers/restaurants.controller.js")

router.route("/restaurants/").get(RestaurantsController.getRestaurants)
router.route("/restaurants/:restaurant_id").get(RestaurantsController.getRestaurant)
router.route("/restaurants/user/:user_sub").get(RestaurantsController.getUserRestaurant)
router.route("/restaurants").post(RestaurantsController.createRestaurant)

module.exports = router
