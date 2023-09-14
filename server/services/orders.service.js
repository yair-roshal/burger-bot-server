const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/constants")
const axios = require("axios")
const https = require("https")
const { generateDateId } = require("../helpers/utils")
console.log("generateDateId", generateDateId())

// const bot = require("../../bot/bot")
const TelegramBot = require("node-telegram-bot-api")
const bot = new TelegramBot(token, { polling: true })
 


class OrdersService {
  constructor() {
    this.connection = null
  }

  async connectToDatabase() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(sqlConfig)
    }
  }

  async getOrders() {
    try {
      await this.connectToDatabase()

      const sqlQuery = "SELECT * FROM orders"
      const [results] = await this.connection.execute(sqlQuery)

      console.log("Orders from DB:", results)

      return results
    } catch (error) {
      console.error("Error executing SQL query:", error)
      throw error
    }
  }

  async createOrder(req, res) {
    const orderData = req.body

    const values = [
      orderData.queryId,
      JSON.stringify(orderData.cartItems), // Convert cartItems to a JSON string
      orderData.comment,
      orderData.totalPrice,
      orderData.address,
      orderData.optionDelivery,
      orderData.user_id,
      orderData.user_name,
      orderData.order_date,
      orderData.paymentMethod,
    ]

    // const tranzilaApiHost = "secure5.tranzila.com"
    // const tranzilaApiPath = "/cgi-bin/tranzila71u.cgi"

    // // Prepare transaction parameters
    // const queryParameters = {
    //   supplier: "burger", // 'terminal_name' should be replaced by actual terminal name
    //   sum: "45.70",
    //   currency: "1", // ILS
    //   ccno: "12312312", // Test card number
    //   expdate: "0824", // Card expiry date: mmyy
    // }

    // // Prepare query string
    // const queryString = Object.entries(queryParameters)
    //   .map(([name, value]) => `${name}=${value}`)
    //   .join("&")

    // // Prepare request URL
    // const url = `https://${tranzilaApiHost}${tranzilaApiPath}`

    // // Send the request using Axios
    // axios
    //   .post(url, queryString, {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Disable SSL verification (not recommended for production)
    //   })
    //   .then((response) => {
    //     const result = response.data

    //     // Preparing associative array with response data
    //     const responseArray = result.split("&")
    //     const responseAssoc = {}

    //     for (const value of responseArray) {
    //       const [key, val] = value.split("=")
    //       responseAssoc[key] = val
    //     }

    //     // Analyze the result string
    //     if (!responseAssoc["Response"]) {
    //       console.log(result)
    //       /**
    //        * When there is no 'Response' parameter it either means
    //        * that some pre-transaction error happened (like authentication
    //        * problems), in which case the result string will be in HTML format,
    //        * explaining the error, or the request was made for generate token only
    //        * (in this case the response string will contain only 'TranzilaTK'
    //        * parameter)
    //        */
    //     } else if (responseAssoc["Response"] !== "000") {
    //       console.log(responseAssoc["Response"])
    //       // Any other than '000' code means transaction failure
    //       // (bad card, expiry, etc..)
    //     } else {
    //       console.log("Success")
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })

    //=====================================

    // await this.connectToDatabase()

    // try {
    //   const sqlQuery = `INSERT INTO orders
    //                     (queryId, cartItems, comment, totalPrice, address, optionDelivery, user_id, user_name, order_date, paymentMethod)
    //                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    //   // const connection = await mysql.createConnection(sqlConfig)

    //   const [results] = await this.connection.execute(sqlQuery, values)

    //   // const [results] = await connection.execute(sqlQuery, values)

    //   console.log("New order saved to DB:", results)
    //   console.log("values111", values)

    //   return results
    // } catch (error) {
    //   console.error("Error executing SQL query:", error)
    //   throw error // Re-throw the error to handle it elsewhere if needed
    // }

    //=========================================================
    let generateIdTemp = generateDateId()
    let productsQuantityPrice = ``

    console.log("/orders_req.body :>> ", req.body)
    const {
      queryId,
      cartItems,
      comment,
      totalPrice,
      address,
      optionDelivery,
      paymentMethod,
    } = req.body

    for (const item of cartItems) {
      const totalPrice = (item.price * item.quantity).toFixed(2) || ""

      productsQuantityPrice =
        productsQuantityPrice +
        `<b>${item.title}</b> * ${item.quantity} = ${totalPrice} ₪` +
        `\n`
    }

    try {
      await bot.answerWebAppQuery(queryId, {
        type: "article",
        id: generateIdTemp,
        title: "Successful purchase",
        input_message_content: {
          parse_mode: "HTML",
          message_text: `
<b>You ordered: </b>
${productsQuantityPrice}
________________       
<b>Total price: </b> ${totalPrice} ₪
________________
<b>Option Delivery: </b> ${optionDelivery}
<b>Your comment: </b> ${comment}
<b>Payment method: </b> ${paymentMethod}   
<b>Thanks! Your order № </b> ${generateIdTemp}
______________________________________________
`,
        },
      })

      console.log("success-200  !!!--->>>")
      return res.status(200).json({ titleStatus: "success-200" })
    } catch (error) {
      console.log("error.message !!!--->>>", error.message)

      return res
        .status(500)
        .json({ titleStatus: "error on server - 500", details: error.message })
    }
  }
}

module.exports = new OrdersService()
