import { Router } from "express";
import userRoutes from "./api/users.routes";
import productRoutes from "./api/products.routes";
import orderRoutes from "./api/orders.routes";
import orderProductRoutes from "./api/orderProducts.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);
routes.use("/orderProducts", orderProductRoutes);

export default routes;
