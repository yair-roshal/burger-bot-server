import dotenv from 'dotenv';

dotenv.config();

export const webAppUrl = "https://dev--burger-web-app.netlify.app/";

export const optionsCloudinary = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

export const cloudinaryConfig = {
  cloud_name: "dvb3cxb9h",
  api_key: "983895153435419",
  api_secret: "Poz4uTvsD0TKuZiXfAIT3Sk_9gc",
};

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectTimeout: number;
}

const devConfig: DbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "burger_db",
  connectTimeout: 10000 // 10 seconds
};

const prodConfig: DbConfig = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  connectTimeout: 10000 // 10 seconds
};

export const sqlConfig: DbConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
console.log("sqlConfig", sqlConfig);