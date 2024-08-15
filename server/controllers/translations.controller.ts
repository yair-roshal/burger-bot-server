import { Request, Response } from 'express';
import TranslationsService from '../services/translations.service';

class TranslationsController {
  async createTranslation(req: Request, res: Response): Promise<Response> {
    const result = await TranslationsService.createTranslation(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-createTranslation" });
  }
}

export default new TranslationsController();