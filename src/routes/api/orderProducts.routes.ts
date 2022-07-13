import Router from "express";
import * as OrderProductsController from "../../Controllers/OrderProductsController";

const routes = Router();
routes
  .route("/:id")
  .get(OrderProductsController.index)
  .post(OrderProductsController.create);
routes
  .route("/:id/products/:id")
  .get(OrderProductsController.show)
  .patch(OrderProductsController.update)
  .delete(OrderProductsController.destroy);

export default routes;
