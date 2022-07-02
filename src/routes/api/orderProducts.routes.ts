import Router from "express";
import * as OrderProductsController from "../../Controllers/OrderProductsController";

const routes = Router();
routes
  .route("/user/:id")
  .get(OrderProductsController.index)
  .post(OrderProductsController.create);
routes
  .route("/user/:id/order/:orderId")
  .get(OrderProductsController.show)
  .patch(OrderProductsController.update)
  .delete(OrderProductsController.destroy);

export default routes;
