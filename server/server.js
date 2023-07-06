const express = require("express")
const app = express()
const routes = require("./routes/index")

const bodyParser = require("body-parser")
const cors = require("cors")

module.exports = (bot) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Enable CORS and set the necessary headers
  app.use(
    cors({
      credentials: true,
       methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
      ],
    })
  );

  // app.use('/', routes)

  app.post("/web-data", async (req, res) => {
 
    
    const { queryId, products = [], totalPrice } = req.body
    // console.log("req :>> ", req)
    console.log("req.body :>> ", req.body)
    try {
      await bot.answerWebAppQuery(queryId, {
        type: "article",
        id: queryId,
        title: "Успешная покупка",
        input_message_content: {
          message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}`,
        },
        // input_message_content: {
        //   message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products
        //     .map((item) => item.title)
        //     .join(", ")}`,
        // },
      })
      return res.status(200).json({ titleStatus: "success-200" })
    } catch (e) {
      console.log("e :>> ", e)
      return res.status(500).json({ titleStatus: "fail-500" })
    }
  })

  const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log("Web server started at port : ", PORT)
  })
}
