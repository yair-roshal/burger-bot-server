const express = require("express")
const router = express.Router()
const RestaurantsController = require("../controllers/restaurants.controller.js")

// Middleware для логирования запросов
function logRequest(req, res, next) {
	if (req.path.startsWith("/restaurants/")) {
	  console.log(`Запрос по пути: ${req.path}`);
	}
	next();
  }
  
  router.use(logRequest);
  
router.route("/restaurants/").get(RestaurantsController.getRestaurants)
router.route("/restaurants/:restaurant_id").get(RestaurantsController.getRestaurant)
router.route("/restaurants/user/:user_sub").get(RestaurantsController.getUserRestaurant)
router.route("/restaurants").post(RestaurantsController.createRestaurant)

module.exports = router
