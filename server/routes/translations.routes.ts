import express from 'express';
import TranslationsController from '../controllers/translations.controller';

const router = express.Router();

router.post("/translations", TranslationsController.createTranslation);

export default router;