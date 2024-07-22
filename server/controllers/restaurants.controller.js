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
	async getUserRestaurant(req, res) {
		const result = await RestaurantsService.getUserRestaurant(req, res);
		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getUserRestaurant" });
	}
	async createRestaurant(req, res) {
		const { userSub } = req.body;
		
		try {
			const result = await RestaurantsService.createRestaurant(userSub);
			console.log(result);
			return res.status(200).send(result);
		} catch (error) {
			console.error("Error creating restaurant:", error);
			return res.status(500).send({ message: "error-createRestaurant" });
		}
	}
}

module.exports = new RestaurantsController();
