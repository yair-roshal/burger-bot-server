const OrdersService = require("../services/orders.service.js")

class OrdersController {
  // async getOrdersStartPage(req, res) {
  //     const result = await OrdersService.getOrdersStartPage(req, res)

  //     if (result) return res.status(200).send(result)
  //     else return res.status(500).send({ message: 'error.' })
  // }

  // async getOrder(req, res) {
  //     const result = await OrdersService.getOrder(req, res)

  //     if (result) return res.status(200).send(result)
  //     else return res.status(500).send({ message: 'error.' })
  // }
//=============================================================
  async getOrders(req, res) {
    const result = await OrdersService.getOrders(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error_getOrders" })
  }
//=============================================================
  async createOrder(req, res) {
    const result = await OrdersService.createOrder(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "server_error_createOrder" })
  }
  
  //=============================================================

  // async pay_credit_card(req, res) {
  //   console.log("pay_credit_card !!!--->>>")
  //   try {
  //     const result = await OrdersService.pay_credit_card(req, res)

  //     if (result) {
  //       console.log("success-200  !!!--->>>")
  //       // return res.status(200).send(result)
  //       return res
  //         .status(200)
  //         .json({ titleStatus: "success-200", result: result })
  //     }
  //   } catch (error) {
  //     console.log("error.message__pay_credit_card !!!--->>>", error.message)

  //     // return res.status(500).send({ message: "server_error_ pay_credit_card" })

  //     return res
  //       .status(500)
  //       .json({
  //         titleStatus: "error on server - 500 - pay_credit_card",
  //         details: error.message,
  //       })
  //   }
  // }

  // async pay_credit_card(req, res) {
  //   const result = await OrdersService.pay_credit_card(req, res)

  //   if (result) return res.status(200).send(result)
  //   else
  //     return res.status(500).send({ message: "server_error_ pay_credit_card" })
  // }

  
  async pay_credit_card(req, res) {
    try {
      const result = await OrdersService.pay_credit_card(req, res);
      console.log('result', result)

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

  
  //=============================================================
  
  
  async create_order_db(req, res) {
    const result = await OrdersService.create_order_db(req, res)

    if (result) return res.status(200).send(result)
    else
      return res.status(500).send({ message: "server_error_ create_order_db" })
  }

  // async updateOrder(req, res) {
  //     const result = await OrdersService.updateOrder(req, res)

  //     if (result) return res.status(200).send(result)
  //     else return res.status(500).send({ message: 'error.' })
  // }

  // async deleteOrder(req, res) {
  //     const result = await OrdersService.deleteOrder(req, res)

  //     if (result) return res.status(200).send(result)
  //     else return res.status(500).send({ message: 'error.' })
  // }

  // async deleteTable(req, res) {
  //     const result = await OrdersService.deleteTable(req, res)

  //     if (result) return res.status(200).send(result)
  //     else return res.status(500).send({ message: 'error.' })
  // }
}

module.exports = new OrdersController()
