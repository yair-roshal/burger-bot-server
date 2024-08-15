import express from 'express';
import QRCodesController from "../controllers/qrcodes.controller";

const router = express.Router();

router.route("/qrcodes/:restaurant_id").get(QRCodesController.getQRCodes.bind(QRCodesController));
router.route("/qrcodes").post(QRCodesController.saveQRCode.bind(QRCodesController));
router.route("/qrcodes/:code_id").delete(QRCodesController.deleteQRCode.bind(QRCodesController));

export default router;