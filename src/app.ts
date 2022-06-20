import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

// express server instance
const app: Application = express();
// enable cors
app.use(cors());
// HTTP request logger middleware
app.use(morgan("dev"));

// api routes
app.use("/api", routes);

// export app for testing
export default app;
