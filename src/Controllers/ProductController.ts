import { NextFunction, Request, Response } from "express";
import Product from "../Models/Product";

const product = new Product();

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await product.getAll();
    res.json({
      status: "success",
      data: products,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqproduct = await product.getById(
      req.params.id as unknown as number
    );
    res.json({
      status: "success",
      data: reqproduct,
      message: "Product retrieved successfully",
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
    const reqproduct = await product.create(req.body);
    res.json({
      status: "success",
      data: { ...reqproduct },
      message: "Product created successfully",
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
    const reqproduct = await product.update(
      req.params.id as unknown as number,
      req.body
    );
    res.json({
      status: "success",
      data: { ...reqproduct },
      message: "Product updated successfully",
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
    const reqproduct = await product.delete(req.params.id as unknown as number);
    res.json({
      status: "success",
      data: { ...reqproduct },
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
