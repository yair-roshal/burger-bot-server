const express = require("express");
const router = express.Router();
const ExtrasController = require("../controllers/extras.controller.js");

router.route("/extras/:restaurant_id").get(ExtrasController.getExtras);
router.route("/extras").post(ExtrasController.createExtra);
router.route("/extras").put(ExtrasController.updateExtra);
router.route("/extras/:extra_id").delete(ExtrasController.deleteExtra);

module.exports = router;
