import Router from "express";
import * as ProductController from "../../Controllers/ProductController";

const routes = Router();
routes.route("/").get(ProductController.index).post(ProductController.create);
routes
  .route("/:id")
  .get(ProductController.show)
  .patch(ProductController.update)
  .delete(ProductController.destroy);

export default routes;
