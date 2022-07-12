import { Router } from "express";
import * as UserController from "../../Controllers/UserController";

const routes = Router();
routes.route("/").get(UserController.index).post(UserController.create);
routes
  .route("/:id")
  .get(UserController.show)
  .patch(UserController.update)
  .delete(UserController.destroy);

// authenticate a user
routes.post("/authenticate", UserController.authenticate);

export default routes;
