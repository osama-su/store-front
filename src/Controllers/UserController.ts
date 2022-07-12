import { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import config from "../config";
import jwt from "jsonwebtoken";

const user = new User();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await user.getAll();
    res.json({
      status: "success",
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requser = await user.getById(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: requser,
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requser = await user.create(req.body);
    res.json({
      status: "success",
      data: { ...requser },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requser = await user.update(
      req.params.id as unknown as number,
      req.body
    );
    res.json({
      status: "success",
      data: { ...requser },
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requser = await user.delete(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: { ...requser },
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// authenticate a user
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const requser = await user.authenticate(username, password);
    const token = jwt.sign(
      { requser },
      config.tokenSecret as unknown as string
    );
    if (!requser) {
      res.status(401).json({
        status: "error",
        message: "Invalid username or password",
      });
    }
    res.json({
      status: "success",
      data: { ...requser, token },
      message: "User authenticated successfully",
    });
  } catch (error) {
    next(error);
  }
};
