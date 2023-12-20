//dishes.routers.js
const express = require("express")
const router = express.Router()
const DishesController = require("../controllers/dishes.controller.js")

router.route("/dishes/:restaurant_id").get(DishesController.getDishes)
router.route("/dishes").post(DishesController.createDish) // Add this line for the createDish route
router.route("/dishes/:dish_id").put(DishesController.updateDish) // Add this line for the updateDish route
router.route("/dishes/:dish_id").delete(DishesController.deleteDish) // Добавляем метод для удаления блюда

router.route("/categories").get(DishesController.getCategories)

module.exports = router
