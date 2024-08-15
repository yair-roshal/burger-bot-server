import { Request, Response } from 'express';
import ExtrasService from '../services/extras.service';

class ExtrasController {
  async getExtras(req: Request, res: Response): Promise<Response> {
    const result = await ExtrasService.getExtras(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getExtras" });
  }

  async createExtra(req: Request, res: Response): Promise<Response> {
    const result = await ExtrasService.createExtra(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-createExtra" });
  }

  async updateExtra(req: Request, res: Response): Promise<Response> {
    const result = await ExtrasService.updateExtra(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-updateExtra" });
  }

  async deleteExtra(req: Request, res: Response): Promise<Response> {
    const result = await ExtrasService.deleteExtra(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-deleteExtra" });
  }
}

export default new ExtrasController();