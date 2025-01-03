import { Request, Response } from 'express';
import RestaurantsService from '../services/restaurants.service';

class RestaurantsController {
  async getRestaurants(req: Request, res: Response): Promise<Response> {
    const result = await RestaurantsService.getRestaurants(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getRestaurants" });
  }

  async getRestaurant(req: Request, res: Response): Promise<Response> {
    const result = await RestaurantsService.getRestaurant(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getRestaurants" });
  }

  async getUserRestaurant(req: Request, res: Response): Promise<Response> {
    console.log("getUserRestaurant req.params :>> ", req.params);
    const result = await RestaurantsService.getUserRestaurant(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getUserRestaurant" });
  }

  async createRestaurant(req: Request, res: Response): Promise<Response> {
    const { userSub } = req.body;

    try {
      const result = await RestaurantsService.createRestaurant(userSub);

      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      console.error("Error creating restaurant:", error);
      return res.status(500).send({ message: "error-createRestaurant" });
    }
  }
}

export default new RestaurantsController();