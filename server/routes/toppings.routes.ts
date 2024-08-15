// toppings.routes.ts
import express from 'express';
import ToppingsController from "../controllers/toppings.controller";

const router = express.Router();

router.route("/toppings/:restaurant_id").get(ToppingsController.getToppings.bind(ToppingsController));
router.route("/toppings").post(ToppingsController.createTopping.bind(ToppingsController));
router.route("/toppings").put(ToppingsController.updateTopping.bind(ToppingsController));
router.route("/toppings/:topping_id").delete(ToppingsController.deleteTopping.bind(ToppingsController));

export default router;