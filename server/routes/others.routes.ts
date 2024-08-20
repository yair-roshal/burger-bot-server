import { Router } from 'express';
import OthersController from '../controllers/others.controller';

const othersRoutes = (bot: any): Router => {
  const router = Router();

  router.post('/send_sms_tele', (req, res) => OthersController.sendSMSTele(req, res, bot));

  return router;
};

export default othersRoutes;