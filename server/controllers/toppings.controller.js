//toppings.controller.js
const ToppingsService = require("../services/toppings.service.js");

class ToppingsController {
	async createTopping(req, res) {
		const result = await ToppingsService.createTopping(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-createTopping" });
	}
	//============================================

	async getToppings(req, res) {
		const result = await ToppingsService.getToppings(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getToppings" });
	}

	//============================================

	async updateTopping(req, res) {
		const result = await ToppingsService.updateTopping(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-updateTopping" });
	}
	//============================================

	async deleteTopping(req, res) {
		const result = await ToppingsService.deleteTopping(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-deleteTopping" });
	}
}

module.exports = new ToppingsController();
