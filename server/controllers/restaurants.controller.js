const RestaurantsService = require("../services/restaurants.service.js");

class RestaurantsController {
	async getRestaurants(req, res) {
		const result = await RestaurantsService.getRestaurants(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getRestaurants" });
	}
	async getRestaurant(req, res) {
		const result = await RestaurantsService.getRestaurant(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getRestaurants" });
	}
}

module.exports = new RestaurantsController();
