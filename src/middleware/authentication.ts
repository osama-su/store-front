import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Error from "../interfaces/errorInterface";
import config from "../config";

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error("Login Error: Please try again");
  error.status = 401;
  next(error);
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer == "bearer") {
        const decoded = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decoded) {
          next();
        }
      } else {
        // token not bearer
        handleUnauthorizedError(next);
      }
    } else {
      // no token provided !
      handleUnauthorizedError(next);
    }
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default authenticate;
