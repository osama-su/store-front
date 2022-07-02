import Router from "express";
import * as OrderController from "../../Controllers/OrderController";

const routes = Router();
routes.route("/").get(OrderController.index).post(OrderController.create);
routes
  .route("/:id")
  .get(OrderController.show)
  .patch(OrderController.update)
  .delete(OrderController.destroy);
routes.route("/user/:id").get(OrderController.getAllByUserId);

export default routes;
