const ExtrasService = require("../services/extras.service.js");

class ExtrasController {
	async getExtras(req, res) {
		const result = await ExtrasService.getExtras(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getExtras" });
	}

	//============================================
	async createExtra(req, res) {
		const result = await ExtrasService.createExtra(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-createExtra" });
	}

	//============================================

	async updateExtra(req, res) {
		const result = await ExtrasService.updateExtra(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-updateExtra" });
	}

	//============================================

	async deleteExtra(req, res) {
		const result = await ExtrasService.deleteExtra(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-deleteExtra" });
	}
}

module.exports = new ExtrasController();
