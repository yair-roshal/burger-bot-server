const express = require("express");
const router = express.Router();
const TypesController = require("../controllers/types.controller.js");

router.route("/types/:restaurant_id").get(TypesController.getTypes);
router.route("/types").post(TypesController.createType);
router.route("/types").put(TypesController.updateType);
router.route("/types/:type_id").delete(TypesController.deleteType);

module.exports = router;
