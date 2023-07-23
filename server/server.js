const express = require("express")
const app = express()
const routes = require("./routes/index")

const bodyParser = require("body-parser")
const cors = require("cors")

// const keyPatch = require("./certificates/burgerim.ru.key")
// const crtPatch = require("./certificates/burgerim.ru.crt")

var https = require("https") // для организации https
var fs = require("fs") // для чтения ключевых файлов

const path = require("path")

httpsOptions = {
  // key: fs.readFileSync(keyPatch),
  // key: fs.readFileSync("./certificates/burgerim.ru.key"),
  key: fs.readFileSync(
    path.join(__dirname, "./certificates/burgerim.ru.key"),
    "utf8"
  ),

  // cert: fs.readFileSync(crtPatch),
  cert: fs.readFileSync(
    path.join(__dirname, "./certificates/burgerim.ru.crt"),
    "utf8"
  ),
  // cert: fs.readFileSync("./certificates/burgerim.ru.crt"),
}

module.exports = (bot) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // app.use(cors())

  //=======================================================================

  //=======================================================================

  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: "*", // Разрешить запросы с любого источника
  //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  //   })
  // );

  // app.use('/', routes)

  // Enable CORS and set the necessary headers
  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: "https://heroic-puffpuff-e7da0d.netlify.app",
  //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  //   })
  // );

  // // app.use(cors());

  // app.use((req, res, next) => {
  //   const allowedOrigins = ["https://heroic-puffpuff-e7da0d.netlify.app", "http://localhost:8889"];
  //   const origin = req.headers.origin;
  //   if (allowedOrigins.includes(origin)) {
  //     res.header("Access-Control-Allow-Origin", origin);
  //   }
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // app.use('/', routes)

  // app.post("/test", async (req, res) => {
  //   console.log("req.body :>> ", req.body)

  //   // res.header("Access-Control-Allow-Origin", "*");
  //   // res.header("Access-Control-Allow-Methods", "POST");
  //   // res.header("Access-Control-Allow-Headers", "Content-Type");

  //   try {
  //     return res.status(200).json({ titleStatus: "test---success-200" })
  //   } catch (e) {
  //     console.log("e :>> ", e)
  //     return res.status(500).json({ titleStatus: "test---fail-500" })
  //   }
  // })

  //=========================================================================

  const allowedOrigins = [
    "https://heroic-puffpuff-e7da0d.netlify.app",
    "https://heroic-puffpuff-e7da0d.netlify.app/checkout",
    "https://serene-moonbeam-93eead.netlify.app/static/js",
    "https://master--serene-moonbeam-93eead.netlify.app",
    "http://localhost:8889",
    "https://api.telegram.org",
  ]

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

  let optionsMessage = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  }

  app.post("/web-data", async (req, res) => {
    console.log("req.body :>> ", req.body)
    const { queryId, products = [], totalPrice } = req.body

    function generateId() {
      let id = ""
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

      for (let i = 0; i < 16; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      return id
    }

    let messageTemp = ``
    for (const item of products) {
      const totalPrice = (item.price * item.quantity).toFixed(2) || ""
      const messageTemp =
      messageTemp +
        `<b>${item.title}</b> * ${item.quantity} = ${totalPrice} $` +
        `\n`
    }

    try {
      await bot.answerWebAppQuery(queryId, {
        type: "article",
        id: generateId(),
        title: "Successful purchase",
        // optionsMessage: optionsMessage,

        input_message_content: {
          // optionsMessage: optionsMessage,
          parse_mode: "HTML",
          message_text: `
            
<b>You ordered: </b>

${messageTemp}
          
${products.map((item) => item.title).join("\n")}

          
<b>Total price: </b>  ${totalPrice} ₪
          
<b> Option Delivery : </b>On site
          
<b>Your comment: </b> __No comment
          
<b>Thanks! Your order № </b> 14846
          
<b>________________ </b>
          
          
Congratulations on your purchase,
you have purchased an item in the amount of ${totalPrice} ₪
           
            
<b>________________ </b>

`,
          //  ` + message,
        },
      })

      //

      //        item.quantity && item.quantity !== 1
      //          ? `x ${item.quantity} = `
      //          : ""
      //      }

      // await bot.sendMessage(chatId, "<b>You ordered: </b>", optionsMessage)

      // for (const item of products) {
      //   const totalPrice = (item.price * item.quantity).toFixed(2)
      //   const message = `<b>${item.title}</b> * ${item.quantity} = ${totalPrice} $`
      //   await bot.sendMessage(chatId, message, optionsMessage)
      // }

      // await bot.sendMessage(
      //   chatId,
      //   `<b>Total price: </b>  ${totalPrice} $`,
      //   optionsMessage
      // )

      // await bot.sendMessage(
      //   chatId,
      //   `<b> Option Delivery : </b>${address ? `${address}` : "On site"}`,
      //   optionsMessage
      // )

      // await bot.sendMessage(
      //   chatId,
      //   `<b>Your comment: </b> ${comment ? comment : "__No comment"}`,
      //   optionsMessage
      // )

      // setTimeout(async () => {
      //   await bot.sendMessage(
      //     chatId,
      //     `<b>Thanks! Your order № </b> 14846`,
      //     optionsMessage
      //   )
      // }, 3000)

      return res.status(200).json({ titleStatus: "success-200" })
    } catch (e) {
      return res.status(500).json({ titleStatus: "fail-500", error: e })
    }
  })

  const PORT = process.env.PORT || 8000

  // app.listen(PORT, () => {
  //   console.log("Web server started at port : ", PORT)
  // })

  // Create an HTTPS server and listen on port 443
  https.createServer(httpsOptions, app).listen(443, () => {
    console.log("https Web server started at port : ", 443)
  })
}
