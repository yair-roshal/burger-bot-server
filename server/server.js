require("rootpath")()
const express = require("express")
var https = require("https")
var fs = require("fs")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/index")
// const errorHandler = require("middleware/error-handler")

const { generateDateId } = require("./helpers/utils")
console.log("generateDateId", generateDateId())

const path = require("path")
httpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "./certificates/burgerim.ru.key"),
    "utf8"
  ),

  cert: fs.readFileSync(
    path.join(__dirname, "./certificates/burgerim.ru.crt"),
    "utf8"
  ),
}

module.exports = (bot) => {
  // app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())
  
  // Adjust the limits for incoming requests
app.use(bodyParser.json({ limit: '10mb' })); // Change the limit according to your needs
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Change the limit according to your needs

 
  //=========================================================================

  // const allowedOrigins = [
  // webAppUrl,
  //   "http://localhost:8889",
  //   "https://api.telegram.org",
  // ]

  const corsOptions = {
    // origin: function (origin, callback) {
    //   if (allowedOrigins.includes(origin) || !origin) {
    //     callback(null, true)
    //   } else {
    //     callback(new Error("Not allowed by CORS"))
    //   }
    // },

    origin: "*", // Разрешить запросы с любого источника
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  }
  app.use(cors(corsOptions))
  // app.use(cors())

  app.use("/", routes)

  // api routes
  // app.use("/users", require("./controllers/users.controller"))

  // global error handler
  // app.use(errorHandler)
  // =========================================================================

  let generateIdTemp = generateDateId()

  app.post("/send_sms_tele", async (req, res) => {
    console.log("/send_sms_tele--req.body :>> ", req.body)
    const {
      queryId,
      cartItems,
      comment,
      totalPrice,
      // address,
      optionDelivery,
      paymentMethod,
    } = req.body

    console.log("for_proshli_num_paamim--------------->>>")

    // fix without toppings ========================================
    // for (const item of cartItems) {
    //   console.log('item_send_sms_tele', item)
    //   const itemPrice = (item.price * item.quantity).toFixed(2) || ""

    //   productsQuantityPrice =
    //     productsQuantityPrice +
    //     `<b>${item.title}</b> * ${item.quantity} = ${itemPrice} ₪` +
    //     `\n`
    // }
    // console.log('productsQuantityPrice', productsQuantityPrice)

    // with toppings ========================================

    let productsQuantityPrice = ``
    console.log("productsQuantityPrice", productsQuantityPrice)

    console.log("cartItems", cartItems)

    for (const item of cartItems) {
      console.log("item_send_sms_tele", item)
      const itemPrice = (item.price * item.quantity).toFixed(2) || ""

      productsQuantityPrice +=
        `<b>${item.title} = </b>${item.price}₪ * ${item.quantity} = ${itemPrice}₪` +
        `\n`
      console.log("productsQuantityPrice_1--->>", productsQuantityPrice)

      if (item.toppings?.length > 0) {
        for (const topping of item.toppings) {
          if (topping.count > 0) {
            const toppingPrice =
              (topping.price * item.quantity).toFixed(2) || ""
            productsQuantityPrice +=
              ` - ${topping.title} = ${topping.price}₪ * ${item.quantity} = ${toppingPrice}₪` +
              "\n"
          }
        }
      }
      console.log("productsQuantityPrice_2--->>", productsQuantityPrice)
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
<b>Total price: </b> ${totalPrice}₪
________________
<b>Option Delivery: </b> ${optionDelivery}
<b>Your comment: </b> ${comment}
<b>Payment method: </b> ${paymentMethod}
<b>Thanks! Your order № </b> ${generateIdTemp}
______________________________________________
`,
        },
      })

      console.log("send_sms_tele__success-200  !!!--->>>")
      return res.status(200).json({ titleStatus: "send_sms_tele__success-200" })
    } catch (error) {
      console.log("error.message !!!--->>>", error.message)

      return res.status(500).json({
        titleStatus: "error on server - 500 _answerWebAppQuery",
        details: error.message,
      })
    }
  })

  // const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
  // let port = 8081

  let port1 = 5005
  
  app.listen(port1, () => {
    console.log(`Server is running on port ${port1}`)
  })
  
  let port = 443

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log("https Web server started at port : ", port)
  })
}
