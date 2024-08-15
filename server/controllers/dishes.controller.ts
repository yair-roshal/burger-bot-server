import { Request, Response } from 'express';
import DishesService from '../services/dishes.service';

class DishesController {
  async getDishes(req: Request, res: Response): Promise<Response> {
    const result = await DishesService.getDishes(req,res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_getDishes" });
  }

  async createDish(req: Request, res: Response): Promise<Response> {
    const result = await DishesService.createDish(req,res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_createDish" });
  }

  async getCategories(req: Request, res: Response): Promise<Response> {
    const result = await DishesService.getCategories();

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getCategories" });
  }

  async updateDish(req: Request, res: Response): Promise<Response> {
    const result = await DishesService.updateDish(req,res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-updateDish" });
  }

  async deleteDish(req: Request, res: Response): Promise<Response> {
    const result = await DishesService.deleteDish(req,res);
    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-deleteDish" });
  }
}

export default new DishesController();