import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

class OrdersController {
  async getOrders(req: Request, res: Response): Promise<Response> {
    const result = await OrdersService.getOrders(req, res);
    // console.log('result :>> ', result);
    
    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error_getOrders" });
  }
// @ts-ignore
  async pay_credit_card(req: Request, res: Response):  Promise<Response> {
 
    try {
      const result = await OrdersService.pay_credit_card(  );
      // console.log("result_pay_credit_card", result);

      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send({ message: "server_error_pay_credit_card" });
      }
    } catch (error) {
      console.error("Error in pay_credit_card:", error);
      return res.status(500).send({ message: "An error occurred during payment" });
    }
  }

  async create_order_db(req: Request, res: Response): Promise<Response> {
    const result = await OrdersService.create_order_db(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "server_error_ create_order_db" });
  }
}

export default new OrdersController();