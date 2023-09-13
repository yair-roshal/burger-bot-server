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

  async getOrders(req, res) {
      const result = await OrdersService.getOrders(req, res)

      if (result) return res.status(200).send(result)
      else return res.status(500).send({ message: 'error.' })
  }

  async createOrder(req, res) {
    const result = await OrdersService.createOrder(req, res)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "server_error_createOrder" })
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
