import { Router } from "express";
import userRoutes from "./api/users.routes";
import productRoutes from "./api/products.routes";
import orderRoutes from "./api/orders.routes";
import orderProductRoutes from "./api/orderProducts.routes";
import authenticate from "../middleware/authentication";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", authenticate, productRoutes);
routes.use("/orders", authenticate, orderRoutes);
routes.use("/orderProducts", authenticate, orderProductRoutes);

export default routes;
