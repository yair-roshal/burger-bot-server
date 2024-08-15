import express, { Request, Response, NextFunction } from 'express';
import RestaurantsController from "../controllers/restaurants.controller";

const router = express.Router();

// Middleware for logging requests
function logRequest(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith("/restaurants/")) {
    console.log(`Request path: ${req.path}`);
  }
  next();
}

router.use(logRequest);

router.route("/restaurants/").get(RestaurantsController.getRestaurants.bind(RestaurantsController));
router.route("/restaurants/:restaurant_id").get(RestaurantsController.getRestaurant.bind(RestaurantsController));
router.route("/restaurants/user/:user_sub").get(RestaurantsController.getUserRestaurant.bind(RestaurantsController));
router.route("/restaurants").post(RestaurantsController.createRestaurant.bind(RestaurantsController));

export default router;