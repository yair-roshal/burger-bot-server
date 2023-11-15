//dishes.controller.js
const DishesService = require("../services/dishes.service.js")

class DishesController {

  async getDishes(req, res) {
    const result = await DishesService.getDishes(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getDishes" })
  }
    //============================================

  async createDish(req, res) {
    const result = await DishesService.createDish(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_createDish" })
  }
    //============================================

  async getDishesByRestaurantName(req, res) {
    const restaurantId = req.params.restaurant_name
    const result = await DishesService.getDishesByRestaurantName(restaurantId)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getDishesByRestaurantName" })
  }
  
  //============================================
  
  async getToppings(req, res) {
    const result = await DishesService.getToppings(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getToppings" })
  }
  //============================================
  
  async getToppingsByRestaurantName(req, res) {
    const restaurant_name = req.params.restaurant_name
    const result = await DishesService.getToppingsByRestaurantName(restaurant_name)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getToppingsByRestaurantName" })
  }
  
    //============================================

  async getCategories(req, res) {
    const result = await DishesService.getCategories(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getCategories" })
  }
}

module.exports = new DishesController()
