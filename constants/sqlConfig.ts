import dotenv from 'dotenv';

dotenv.config();

interface SqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const devConfig: SqlConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "burger_db",
};

const prodConfig: SqlConfig = {
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
};

const sqlConfig: SqlConfig = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
console.log("sqlConfig", sqlConfig);

export { sqlConfig };