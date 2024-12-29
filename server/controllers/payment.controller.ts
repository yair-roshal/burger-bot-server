import { Request, Response } from "express";
import { addSubscription } from "../services/subscription.service";

const PaymentController = {
  async execute(req: Request, res: Response): Promise<Response> {
    const { services } = req.body;

    const subscriptionItem =
      services instanceof Array
        ? services.find((item) => item?.type === "subscription")
        : null;

    if (!subscriptionItem?.period) {
      return res.status(500).send({
        message: "error PaymentController service for payment not found",
      });
    }

    const result = await addSubscription(
      +req.body.restaurant_id,
      +subscriptionItem.period
    );

    if (!result) {
      return res
        .status(500)
        .send({ message: "error PaymentController execute" });
    }

    return res.status(200).send();
  },
};

export default PaymentController;
