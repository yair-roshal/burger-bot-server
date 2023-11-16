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

  async createTopping(req, res) {
    const result = await DishesService.createTopping(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-createTopping" })
  }
    //============================================

  async getDishesByRestaurantId(req, res) {
    const restaurant_id = req.params.restaurant_id
    const result = await DishesService.getDishesByRestaurantId(restaurant_id)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getDishesByRestaurantId" })
  }
  
  //============================================
  
  async getToppings(req, res) {
    const result = await DishesService.getToppings(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getToppings" })
  }
  //============================================
  
  async getToppingsByRestaurantId(req, res) {
    const restaurant_id = req.params.restaurant_id
    const result = await DishesService.getToppingsByRestaurantId(restaurant_id)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getToppingsByRestaurantId" })
  }
  
    //============================================

  async getCategories(req, res) {
    const result = await DishesService.getCategories(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getCategories" })
  }
      //============================================

  async updateDish(req, res) {
    // const dish_id = req.params.dish_id
    // console.log('dish_id :>> ', dish_id);
    const result = await DishesService.updateDish(req, res)
  
    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-updateDish" })
  }
      //============================================

  async deleteDish(req, res) {
    // const dish_id = req.params.dish_id
    // console.log('dish_id :>> ', dish_id);
    const result = await DishesService.deleteDish(req, res)
  
    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-deleteDish" })
  }
}

module.exports = new DishesController()
