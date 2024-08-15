import express from 'express';
import DishesController from '../controllers/dishes.controller';

const router = express.Router();

router.route("/dishes/:restaurant_id").get(DishesController.getDishes.bind(DishesController));
router.route("/dishes").post(DishesController.createDish.bind(DishesController));
router.route("/dishes/:dish_id").put(DishesController.updateDish.bind(DishesController));
router.route("/dishes/:dish_id").delete(DishesController.deleteDish.bind(DishesController));

router.route("/categories").get(DishesController.getCategories.bind(DishesController));

export default router;