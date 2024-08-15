import express from 'express';
import TypesController from "../controllers/types.controller";

const router = express.Router();

router.route("/types/:restaurant_id").get(TypesController.getTypes.bind(TypesController));
router.route("/types").post(TypesController.createType.bind(TypesController));
router.route("/types").put(TypesController.updateType.bind(TypesController));
router.route("/types/:type_id").delete(TypesController.deleteType.bind(TypesController));

export default router;