import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "your-strong-secret-key";
export const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
export const MYSQL_PORT = process.env.MYSQL_PORT || 3306;
export const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "your_username";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "your_password";
export const MYSQL_DATABASE =
  process.env.MYSQL_DATABASE || "your_database_name";
