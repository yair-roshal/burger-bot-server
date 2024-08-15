import express from 'express';
import ExtrasController from '../controllers/extras.controller';

const router = express.Router();

router.route("/extras/:restaurant_id").get(ExtrasController.getExtras.bind(ExtrasController));
router.route("/extras").post(ExtrasController.createExtra.bind(ExtrasController));
router.route("/extras").put(ExtrasController.updateExtra.bind(ExtrasController));
router.route("/extras/:extra_id").delete(ExtrasController.deleteExtra.bind(ExtrasController));

export default router;