import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes";

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

// export app for testing
export default app;
