const express = require("express")
var https = require("https")
var fs = require("fs")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/index")

const { 
  generateDateId,
} = require("./helpers/utils") 
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
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // app.use(cors())

  // app.use('/', routes)

  //=========================================================================

  // const allowedOrigins = [
  //   "https://heroic-puffpuff-e7da0d.netlify.app",
  //   "https://heroic-puffpuff-e7da0d.netlify.app/checkout",
  //   "https://serene-moonbeam-93eead.netlify.app/static/js",
  //   "https://master--serene-moonbeam-93eead.netlify.app",
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

  //=========================================================================

  // let optionsMessage = {
  //   parse_mode: "HTML",
  //   disable_web_page_preview: true,
  // }

  let generateIdTemp = generateDateId()
  let productsQuantityPrice = ``

  app.post("/web-data", async (req, res) => {
    console.log("/web-data_req.body :>> ", req.body)
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
        `<b>${item.title}</b> * ${item.quantity} = ${totalPrice} ₪`+ `\n` 
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
  })

  // const PORT = process.env.PORT || 8000

  // Create an HTTPS server and listen on port 443
  https.createServer(httpsOptions, app).listen(443, () => {
    console.log("https Web server started at port : ", 443)
  })
}
