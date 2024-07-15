const GroupsService = require("../services/groups.service.js");

class GroupsController {
	async getGroups(req, res) {
		const result = await GroupsService.getGroups(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-getGroups" });
	}

	//============================================
	async createGroup(req, res) {
		const result = await GroupsService.createGroup(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-createGroup" });
	}

	//============================================

	async updateGroup(req, res) {
		const result = await GroupsService.updateGroup(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-updateGroup" });
	}

	//============================================

	async deleteGroup(req, res) {
		const result = await GroupsService.deleteGroup(req, res);

		if (result) return res.status(200).send(result);
		else return res.status(500).send({ message: "error-deleteGroup" });
	}
}

module.exports = new GroupsController();
