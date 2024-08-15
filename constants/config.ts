import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

interface HttpsOptions {
  key: string;
  cert: string;
}

interface CorsOptions {
  origin: string;
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
}

const httpsOptions: HttpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "../server/certificates/burgerim.ru.key"),
    "utf8"
  ),

  cert: fs.readFileSync(
    path.join(__dirname, "../server/certificates/burgerim.ru.crt"),
    "utf8"
  ),
};

const corsOptions: CorsOptions = {
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
};

export { httpsOptions, corsOptions };