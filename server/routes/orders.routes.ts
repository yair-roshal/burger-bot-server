import express from 'express';
import OrderController from '../controllers/orders.controller';

const router = express.Router();

router.route('/orders/:restaurant_id').get(OrderController.getOrders.bind(OrderController));
router.route('/pay_credit_card').post(OrderController.pay_credit_card.bind(OrderController));
router.route('/create_order_db').post(OrderController.create_order_db.bind(OrderController));

export default router;