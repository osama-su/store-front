import { NextFunction, Request, Response } from "express";
import OrderProduct from "../Models/OrderProduct";

const orderProduct = new OrderProduct();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProducts = await orderProduct.getAll();
    res.json({
      status: "success",
      data: orderProducts,
      message: "OrderProducts retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqorderProduct = await orderProduct.getByOrderId(
      req.params.orderId as unknown as number
    );
    res.json({
      status: "success",
      data: reqorderProduct,
      message: "OrderProduct retrieved successfully",
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
    const reqorderProduct = await orderProduct.create(req.body);
    res.json({
      status: "success",
      data: { ...reqorderProduct },
      message: "OrderProduct created successfully",
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
    const reqorderProduct = await orderProduct.update(req.body);
    res.json({
      status: "success",
      data: { ...reqorderProduct },
      message: "OrderProduct updated successfully",
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
    const reqorderProduct = await orderProduct.delete(req.body.orderId);
    res.json({
      status: "success",
      data: { ...reqorderProduct },
      message: "OrderProduct deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
