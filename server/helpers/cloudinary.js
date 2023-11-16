const dotenv = require("dotenv")
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dvb3cxb9h",
  api_key: "983895153435419",
  api_secret: "Poz4uTvsD0TKuZiXfAIT3Sk_9gc"
})

module.exports = cloudinary
