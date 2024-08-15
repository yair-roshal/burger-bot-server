import { Request, Response } from 'express';
import ToppingsService from '../services/toppings.service';

class ToppingsController {
  async createTopping(req: Request, res: Response): Promise<Response> {
    const result = await ToppingsService.createTopping(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-createTopping" });
  }

  async getToppings(req: Request, res: Response): Promise<Response> {
    const result = await ToppingsService.getToppings(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getToppings" });
  }

  async updateTopping(req: Request, res: Response): Promise<Response> {
    const result = await ToppingsService.updateTopping(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-updateTopping" });
  }

  async deleteTopping(req: Request, res: Response): Promise<Response> {
    const result = await ToppingsService.deleteTopping(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-deleteTopping" });
  }
}

export default new ToppingsController();