const express = require("express")
const app = express()
const routes = require("./routes/index")

const bodyParser = require("body-parser")
const cors = require("cors")

module.exports = (bot) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // app.use(cors())

  //=======================================================================

  const allowedOrigins = [
    "https://heroic-puffpuff-e7da0d.netlify.app",
    "https://heroic-puffpuff-e7da0d.netlify.app/checkout",
    
    "https://master--serene-moonbeam-93eead.netlify.app",
    
    "http://localhost:8889",
    "https://api.telegram.org",
  ]

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  }

  app.use(cors(corsOptions))

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

  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    })
  )

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

  app.post("/web-data", async (req, res) => {
    console.log("req.body :>> ", req.body)
    const { queryId, products = [], totalPrice } = req.body
    // console.log("req :>> ", req)

    function generateId() {
      let id = ""
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

      for (let i = 0; i < 16; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      return id
    }

    // Пример использования
    const generatedId = generateId()

    try {
      await bot.answerWebAppQuery(queryId, {
        type: "article",
        id: generatedId,
        title: "Успешная покупка",

        input_message_content: {
          message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
            .map((item) => item.title)
            .join(", ")}`,
        },
      })

      return res.status(200).json({ titleStatus: "success-200" })
    } catch (e) {
      console.log("e :>> ", e)
      return res.status(500).json({ titleStatus: "fail-500", error: e })
    }
  })

  const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log("Web server started at port : ", PORT)
  })
}
