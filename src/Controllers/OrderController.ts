import { NextFunction, Request, Response } from "express";
import Order from "../Models/Order";

const order = new Order();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await order.getAll();
    res.json({
      status: "success",
      data: orders,
      message: "Orders retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqorder = await order.getById(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: reqorder,
      message: "Order retrieved successfully",
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
    const reqorder = await order.create(req.body);
    res.json({
      status: "success",
      data: { ...reqorder },
      message: "Order created successfully",
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
    const reqorder = await order.update(req.body);
    res.json({
      status: "success",
      data: { ...reqorder },
      message: "Order updated successfully",
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
    const reqorder = await order.delete(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: { ...reqorder },
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqorder = await order.getAllByUserId(
      req.params.id as unknown as number
    );
    res.json({
      status: "success",
      data: reqorder,
      message: "Order retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
