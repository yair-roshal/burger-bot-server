import "rootpath"
import express, { Request, Response } from "express"
import https from "https"
import bodyParser from "body-parser"
import cors from "cors"
import { generateDateId } from "./helpers/utils"
import { httpsOptions, corsOptions } from "../constants/config"
import routes from "./routes/index"

console.log("generateDateId", generateDateId())

interface ExtendedRequest extends Request {
  body: {
    queryId: string
    cartItems: any[]
    comment?: string
    totalPrice: number
    optionDelivery: string
    paymentMethod: string
    user_name: string
  }
}

export default (bot?: any) => {
  const app = express()

  app.use(bodyParser.json({ limit: "10mb" }))
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))

  app.use(cors(corsOptions))

  // Handle root path explicitly
  app.get("/", (req: Request, res: Response) => {
    res.status(404).send("Not Found")
  })

  app.use("/", routes)

  let generateIdTemp = generateDateId()

  app.post("/send_sms_tele", async (req: ExtendedRequest, res: Response) => {
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
      if (bot && bot.answerWebAppQuery) {
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
<b>Your comment: </b> ${
              comment ? (comment.trim().length > 0 ? comment : " - ") : " - "
            }
<b>Payment method: </b> ${paymentMethod}
<b>Thanks! Your order № </b> ${generateIdTemp}
______________________________________________
`,
            thumb_url:
              "https://dev--burger-web-app.netlify.app/static/media/Cafe_Cafe_Logo.1e03e875a5ae1e2be16a.png",
          },
        })
      }

      console.log("send_sms_tele__success-200  !!!--->>>")
      return res.status(200).json({ titleStatus: "send_sms_tele__success-200" })
    } catch (error: any) {
      console.log("error.message !!!--->>>", error.message)

      return res.status(500).json({
        titleStatus: "error on server - 500 _answerWebAppQuery",
        details: error.message,
      })
    }
  })

  return app
}

// if (require.main === module) {
const app = exports.default()
const port1 = 5005
const port = 443

app.listen(port1, () => {
  console.log(`Server is running on port ${port1}`)
})

https.createServer(httpsOptions, app).listen(port, () => {
  console.log("https Web server started at port : ", port)
})
// }
