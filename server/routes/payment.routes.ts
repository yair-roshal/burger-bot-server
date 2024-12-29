import express from 'express';
import PaymentController from '../controllers/payment.controller';

const router = express.Router();

router.post('/payment/execute', (req, res) => PaymentController.execute(req, res))

export default router;