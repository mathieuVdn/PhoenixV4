import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initUsersRoutes = (app) => {
  const router = Router();
  router.get("/", UserController.getAllUsers);
  router.get("/:id", UserController.getUserById);
  router.post("/sign-up", UserController.signUp);
  router.post("/sign-in", UserController.signIn);
  router.put("/:id", UserController.updateUser);
  router.delete("/:id", UserController.deleteUser);
  app.use("/users", router);
};

export default initUsersRoutes;
