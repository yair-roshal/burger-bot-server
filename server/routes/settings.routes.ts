// settings.routes.ts
import express from 'express';
import SettingsController from "../controllers/settings.controller";

const router = express.Router();

router.route("/settings/:restaurant_id").get(SettingsController.getSettings.bind(SettingsController));
router.route("/settings/:restaurant_id").put(SettingsController.updateSettings.bind(SettingsController));

export default router;