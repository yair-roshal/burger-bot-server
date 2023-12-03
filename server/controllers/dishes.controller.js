//dishes.controller.js
const DishesService = require("../services/dishes.service.js");

class DishesController {
	async getDishes(req, res) {
		const result = await DishesService.getDishes(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error_getDishes" });
	}
	//============================================

	async createDish(req, res) {
		const result = await DishesService.createDish(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error_createDish" });
	}
	//============================================

	async getDishes(req, res) {
 		const result = await DishesService.getDishes(req, res) 

		if (result) return res.status(200).send(result);
		else
			return res.status(500).send({ message: "error-getDishes" });
	}

	//============================================

	async getCategories(req, res) {
		const result = await DishesService.getCategories(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getCategories" });
	}
	//============================================

	async updateDish(req, res) {
		const result = await DishesService.updateDish(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-updateDish" });
	}
	//============================================

	async deleteDish(req, res) {
		const result = await DishesService.deleteDish(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-deleteDish" });
	}
}

module.exports = new DishesController();
