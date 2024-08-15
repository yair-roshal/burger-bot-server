import { Request, Response } from 'express';
import SettingsService from '../services/settings.service';

class SettingsController {
  async getSettings(req: Request, res: Response): Promise<Response> {
    const result = await SettingsService.getSettings(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_getSettings" });
  }

  async updateSettings(req: Request, res: Response): Promise<Response> {
    const result = await SettingsService.updateSettings(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_updateSettings" });
  }
}

export default new SettingsController();