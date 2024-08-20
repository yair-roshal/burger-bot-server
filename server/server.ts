import "rootpath"
import express, { Request, Response } from "express"
import https from "https"
import bodyParser from "body-parser"
import cors from "cors"
import { generateDateId } from "./helpers/utils"
import { httpsOptions, corsOptions } from "../constants/config"
// import routes from "./routes/index"
import createRouter from "./routes/index";

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

  // Логирование запроса для отладки CORS
  // app.use((req, res, next) => {
  //   // console.log("CORS middleware triggered")
  //   next()
  // })

  app.use(bodyParser.json({ limit: "10mb" }))
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))

  // console.log('corsOptions :>> ', corsOptions);
  app.use(cors(corsOptions))
   
 
  
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   next();
  // });
  
  // app.use("/", routes)
  app.use("/", createRouter(bot));  // Используем функцию для создания маршрутов с ботом



  return app
}

// if (require.main === module) {

const app = exports.default()
const port1 = 5005
const port2 = 443

app.listen(port1, () => {
  console.log(`Server is running on port ${port1}`)
})

https.createServer(httpsOptions, app).listen(port2, () => {
  console.log("https Web server started at port : ", port2)
})

// }
