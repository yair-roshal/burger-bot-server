// services/others.service.ts
import { Request, Response } from "express";
import { generateDateId } from "../helpers/utils";

class OthersService {
  async sendSMSTele(req: Request, res: Response, bot: any) {
    let generateIdTemp = generateDateId();

    const {
      queryId,
      cartItems,
      comment,
      totalPrice,
      optionDelivery,
      paymentMethod,
      user_name,
    } = req.body;

    let productsList = ``;

    for (const item of cartItems) {
      const itemPrice = (item.price * item.quantity).toFixed(2) || "";

      productsList +=
        `<b>${item.title} = </b>${item.price}₪ * ${item.quantity} = ${itemPrice}₪\n`;

      if (item.selectedExtrasNames) {
        productsList += `-extras\n`;

        for (const extra of Object.keys(item.selectedExtrasNames)) {
          productsList += `-- ${extra} - ${item.selectedExtrasNames[extra]}\n`;
        }
      }

      if (item.toppings?.length > 0) {
        for (const topping of item.toppings) {
          if (topping.count > 0) {
            const toppingPrice =
              (topping.price * item.quantity).toFixed(2) || "";
            productsList += `-toppings\n`;
            productsList +=
              `-- ${topping.title} = ${topping.price}₪ * ${item.quantity} = ${toppingPrice}₪\n`;
          }
        }
      }
    }

    try {
      if (bot && bot.answerWebAppQuery) {
        await bot.answerWebAppQuery(queryId, {
          type: "article",
          id: generateIdTemp,
          title: "Successful purchase",
          input_message_content: {
            parse_mode: "HTML",
            message_text: `
<b>${user_name}, thank you for your order:</b>

${productsList}
________________
<b>Total price: </b> ${totalPrice}₪
________________
<b>Option Delivery: </b> ${optionDelivery}
<b>Your comment: </b> ${comment ? (comment.trim().length > 0 ? comment : " - ") : " - "}
<b>Payment method: </b> ${paymentMethod}
<b>Thanks! Your order №</b> ${generateIdTemp}
______________________________________________
`,
            thumb_url: "https://dev--burger-web-app.netlify.app/static/media/Cafe_Cafe_Logo.1e03e875a5ae1e2be16a.png",
          },
        });
      }

      return res.status(200).json({ titleStatus: "send_sms_tele__success-200" });
    } catch (error: any) {
      return res.status(500).json({
        titleStatus: "error on server - 500 _answerWebAppQuery",
        details: error.message,
      });
    }
  }
}

export default new OthersService();