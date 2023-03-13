import { Router } from "express";
import { OperationController } from "../controllers/operation.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initOperationsRoutes = (app) => {
  const router = Router();
  router.get("/", jwtMiddleware, OperationController.readAllOperations);
  router.get("/:id", jwtMiddleware, OperationController.readOperation);
  router.post("/", jwtMiddleware, OperationController.createOperation);
  router.put("/:id", jwtMiddleware, OperationController.updateOperation);
  router.delete("/:id", jwtMiddleware, OperationController.deleteOperation);
  app.use("/operations", router);
};

export default initOperationsRoutes;