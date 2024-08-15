import { Request, Response } from 'express';
import db from '../helpers/db';
import axios from 'axios';
import https from 'https';

interface Order {
  queryId: string;
  cartItems: string;
  comment: string;
  totalPrice: number;
  address: string;
  optionDelivery: string;
  user_id: string;
  user_name: string;
  order_date: Date;
  paymentMethod: string;
  restaurantId: string;
}

class OrdersService {
  // @ts-ignore
  async getOrders(req: Request, res: Response) {
    const restaurant_id = req.params.restaurant_id;
    console.log("getOrders_restaurant_id :>> ", restaurant_id);
    // console.log("req :>> ", req);
    const sqlQuery = "SELECT * FROM orders WHERE restaurant_id = ?";
    return db.executeQuery(sqlQuery, [restaurant_id]);
  }
// @ts-ignore
  async create_order_db(req: Request, res: Response) {
    console.log('req.body :>> ', req.body);
    const orderData: Order = req.body;
    const timeOrder = new Date();

    const values = [
      orderData.queryId,
      JSON.stringify(orderData.cartItems),
      orderData.comment,
      orderData.totalPrice,
      orderData.address,
      orderData.optionDelivery,
      orderData.user_id || "",
      orderData.user_name || "",
      timeOrder,
      orderData.paymentMethod,
      orderData.restaurantId,
    ].map(param => param === undefined ? null : param);;

    const sqlQuery = `INSERT INTO orders 
                      (queryId, cartItems, comment, totalPrice, address, optionDelivery, user_id, user_name, order_date, paymentMethod, restaurant_id) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
      const result = await db.executeQuery(sqlQuery, values);
      console.log('"create_order_db_ Заказ успешно создан" ');
      return result;
    } catch (error) {
      console.error("create_order_db Ошибка при создании заказа:", error);
      throw error;
    }
  }

  async pay_credit_card( ) {
  // async pay_credit_card(req: Request, res: Response) {
    const queryParameters = {
      supplier: "burger",
      sum: "45.70",
      currency: "1",
      ccno: "12312312",
      expdate: "0824",
    };

    const queryString = Object.entries(queryParameters)
      .map(([name, value]) => `${name}=${value}`)
      .join("&");

    const tranzilaApiHost = "secure5.tranzila.com";
    const tranzilaApiPath = "/cgi-bin/tranzila71u.cgi";
    const url = `https://${tranzilaApiHost}${tranzilaApiPath}`;

    return axios
      .post(url, queryString, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      })
      .then((response) => {
        const result = response.data;
        const responseArray = result.split("&");
        const responseAssoc: { [key: string]: string } = {};

        for (const value of responseArray) {
          const [key, val] = value.split("=");
          responseAssoc[key] = val;
        }

        if (!responseAssoc["Response"]) {
          // console.log("result_1111", result);
        } else if (responseAssoc["Response"] !== "000") {
          console.log(responseAssoc["Response"]);
        } else {
          console.log("Success");
          console.log(
            'responseAssoc["Response"]--->',
            responseAssoc["Response"]
          );
          console.log("result2222", result);
          return result;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new OrdersService();