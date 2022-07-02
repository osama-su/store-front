import { Router } from "express";
import * as UserController from "../../Controllers/UserController";

const routes = Router();
routes.route("/").get(UserController.index).post(UserController.create);
routes
  .route("/:id")
  .get(UserController.show)
  .patch(UserController.update)
  .delete(UserController.destroy);

export default routes;
