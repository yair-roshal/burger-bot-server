import { Request, Response } from 'express';
import TypesService from '../services/types.service';

class TypesController {
  async getTypes(req: Request, res: Response): Promise<Response> {
    const result = await TypesService.getTypes(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getTypes" });
  }

  async createType(req: Request, res: Response): Promise<Response> {
    const result = await TypesService.createType(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-createType" });
  }

  async updateType(req: Request, res: Response): Promise<Response> {
    const result = await TypesService.updateType(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-updateType" });
  }

  async deleteType(req: Request, res: Response): Promise<Response> {
    const result = await TypesService.deleteType(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-deleteType" });
  }
}

export default new TypesController();