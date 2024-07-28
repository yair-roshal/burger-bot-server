require("rootpath")()
const express = require("express")
var https = require("https")
var fs = require("fs")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/index")
const authRoutes = require("./routes/auth.routes")
const dotenv = require("dotenv")

const { generateDateId } = require("./helpers/utils")
console.log("generateDateId", generateDateId())
const { httpsOptions, corsOptions } = require("../constants/config")

dotenv.config()

module.exports = (bot) => {
  // Adjust the limits for incoming requests
  app.use(bodyParser.json({ limit: "10mb" })) // Change the limit according to your needs
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })) // Change the limit according to your needs

  app.use(cors(corsOptions))

  // Use authentication routes
  app.use("/auth", authRoutes)

  app.use("/", routes)

  let generateIdTemp = generateDateId()

  app.post("/send_sms_tele", async (req, res) => {
    console.log("/send_sms_tele--req.body :>> ", req.body)
    const {
      queryId,
      cartItems,
      comment,
      totalPrice,
      optionDelivery,
      paymentMethod,
      user_name,
    } = req.body

    console.log("for_proshli_num_paamim--------------->>>")

    let productsList = ``
    console.log("productsList", productsList)

    console.log("cartItems", cartItems)

    for (const item of cartItems) {
      console.log("item_send_sms_tele", item)
      const itemPrice = (item.price * item.quantity).toFixed(2) || ""

      productsList +=
        `<b>${item.title} = </b>${item.price}₪ * ${item.quantity} = ${itemPrice}₪` +
        `\n`
      console.log("productsList_1--->>", productsList)

      if (item.selectedExtrasNames) {
        productsList += `-extras` + "\n"

        for (const extra in item.selectedExtrasNames) {
          productsList +=
            `-- ${extra} - ${item.selectedExtrasNames[extra]} ` + "\n"
        }
      }

      if (item.toppings?.length > 0) {
        for (const topping of item.toppings) {
          if (topping.count > 0) {
            productsList += `-toppings` + "\n"
            const toppingPrice =
              (topping.price * item.quantity).toFixed(2) || ""
            productsList +=
              ` -- ${topping.title} = ${topping.price}₪ * ${item.quantity} = ${toppingPrice}₪` +
              "\n"
          }
        }
      }

      console.log("productsList_2--->>", productsList)
    }

    try {
      await bot.answerWebAppQuery(queryId, {
        type: "article",
        id: generateIdTemp,
        title: "Successful purchase",
        input_message_content: {
          parse_mode: "HTML",
          message_text: `
          
<b>${user_name} thank for your order: </b>

${productsList}
________________
<b>Total price: </b> ${totalPrice}₪
________________
<b>Option Delivery: </b> ${optionDelivery}
<b>Your comment: </b> ${comment?.trim().length > 0 ? comment : " - "}
<b>Payment method: </b> ${paymentMethod}
<b>Thanks! Your order № </b> ${generateIdTemp}
______________________________________________
`,

          //todo change url to generic
          thumb_url:
            "https://dev--burger-web-app.netlify.app/static/media/Cafe_Cafe_Logo.1e03e875a5ae1e2be16a.png",
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

  let port1 = 5005

  app.listen(port1, () => {
    console.log(`Server is running on port ${port1}`)
  })

  let port = 443

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log("https Web server started at port : ", port)
  })
}