const TypesService = require("../services/types.service.js");

class TypesController {
	async getTypes(req, res) {
		const result = await TypesService.getTypes(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getTypes" });
	}

	//============================================
	async createType(req, res) {
		const result = await TypesService.createType(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-createType" });
	}

	//============================================

	async updateType(req, res) {
		const result = await TypesService.updateType(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-updateType" });
	}

	//============================================

	async deleteType(req, res) {
		const result = await TypesService.deleteType(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-deleteType" });
	}
}

module.exports = new TypesController();
