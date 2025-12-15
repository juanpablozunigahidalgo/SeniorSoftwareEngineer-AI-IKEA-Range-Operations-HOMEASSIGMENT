import "dotenv/config";

export const envs = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "password123",
    name: process.env.DB_NAME || "stock_inventory",
  },
};