import dotenv from "dotenv"
import path from "path"
import fs from "fs"

dotenv.config()

interface HttpsOptions {
  key: string
  cert: string
}

interface CorsOptions {
  origin: string
  credentials: boolean
  methods: string[]
  allowedHeaders: string[]
  preflightContinue: boolean
  optionsSuccessStatus: number
}

const httpsOptions: HttpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "../server/certificates/certificate.key"),
    // path.join(__dirname, "../server/certificates/burgerim.ru.key"),
    "utf8"
  ),

  cert: fs.readFileSync(
    path.join(__dirname, "../server/certificates/certificate.crt"),
    // path.join(__dirname, "../server/certificates/burgerim.ru.crt"),
    "utf8"
  ),
}

const allowedOrigins = [
  "https://burgerim.ru",
  "http://burgerim.ru",
  "http://localhost:8889",
]

const corsOptions: CorsOptions = {
  // origin: function (origin, callback) {
  //   if (allowedOrigins.includes(origin) || !origin) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error("Not allowed by CORS"))
  //   }
  // },

  origin: "*", // Разрешить запросы с любого источника
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"], // Разрешить все основные HTTP-методы
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ], // Разрешить все необходимые заголовки
  
    // Если в вашем коде credentials: true, то origin: "*" работать не будет. 
  // credentials: true, // Разрешить отправку куки и авторизационных заголовков
  credentials: false, // Отключить поддержку авторизационных заголовков и куки
  
  preflightContinue: false, // Не продолжать preflight запросы (OPTIONS)
  optionsSuccessStatus: 204, // Для preflight-запросов возвращать статус 204
}

export { httpsOptions, corsOptions }
