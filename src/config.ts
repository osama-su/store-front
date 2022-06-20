import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    // if development, use the dev database else use the test database
    database:
      process.env.NODE_ENV === "development"
        ? process.env.DB_NAME
        : process.env.DB_NAME_TEST,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
  },
};

export default config;
