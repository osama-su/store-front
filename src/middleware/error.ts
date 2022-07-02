import { Response, Request, NextFunction } from "express";
import Error from "../interfaces/errorInterface";

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Something broke!";
  res.status(status).json({ status, message });
};

export default error;
