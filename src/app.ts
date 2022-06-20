import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import error from "./middleware/error";
import routes from "./routes";
import db from "./database";
import { ClientRequest } from "http";

// express server instance
const app: Application = express();
// middleware for parsing json & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());
// HTTP security middleware
app.use(helmet());

// HTTP request logger middleware
app.use(morgan("dev"));

// api routes
app.use("/api", routes);
// test database connection
db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.error(err.stack);
    });
});

// handle 404 error & error handler
app.use(error);
app.use((req, res, next) => {
  res.status(404).json({
    message:
      "404 Not Found - The requested URL was not found on the server.check the API documentation for the correct URL.",
  });
});
// export app for testing
export default app;
