//settings.controller.js
const SettingsService = require("../services/settings.service.js");

class SettingsController {
  async getSettings(req, res) {
    const result = await SettingsService.getSettings(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_getSettings" });
  }
  //============================================

  async updateSettings(req, res) {
    const result = await SettingsService.updateSettings(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_updateSettings" });
  }
}

module.exports = new SettingsController();
