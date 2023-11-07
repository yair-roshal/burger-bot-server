const MenuService = require("../services/menu.service.js")

class MenuController {
  async getMenu(req, res) {
    const result = await MenuService.getMenu(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getMenu" })
  }
}

module.exports = new MenuController()
