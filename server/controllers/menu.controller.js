//menu.controller.js
const MenuService = require("../services/menu.service.js")

class MenuController {
  async getMenu(req, res) {
    const restaurantId = req.params.restaurant_name
    const result = await MenuService.getMenu(restaurantId)

    // const result = await MenuService.getMenu(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getMenu" })
  }
  async getToppings(req, res) {
    const result = await MenuService.getToppings(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getToppings" })
  }
  async getCategories(req, res) {
    const result = await MenuService.getCategories(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getCategories" })
  }
}

module.exports = new MenuController()
