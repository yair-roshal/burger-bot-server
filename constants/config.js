require("dotenv").config();
const path = require("path");
const fs = require("fs");

const httpsOptions = {
  key: fs.readFileSync(
    path.join(__dirname, "../server/certificates/burgerim.ru.key"),
    "utf8"
  ),

  cert: fs.readFileSync(
    path.join(__dirname, "../server/certificates/burgerim.ru.crt"),
    "utf8"
  ),
};

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
};




module.exports = { httpsOptions, corsOptions };
