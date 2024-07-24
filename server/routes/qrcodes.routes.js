const express = require("express");
const router = express.Router();
const QRCodesController = require("../controllers/qrcodes.controller.js");

router.route("/qrcodes/:restaurant_id").get(QRCodesController.getQRCodes);
router.route("/qrcodes").post(QRCodesController.saveQRCode);
router.route("/qrcodes/:code_id").delete(QRCodesController.deleteQRCode);

module.exports = router;