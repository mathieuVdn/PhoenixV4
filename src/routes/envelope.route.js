import { Router } from "express";
import { EnvelopeController } from "../controllers/envelope.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initEnvelopesRoutes = (app) => {
  const router = Router();
  router.get("/", jwtMiddleware, EnvelopeController.readAllEnvelopes);
  router.get("/:id", jwtMiddleware, EnvelopeController.readEnvelope);
  router.post("/", jwtMiddleware, EnvelopeController.createEnvelope);
  router.put("/:id", jwtMiddleware, EnvelopeController.updateEnvelope);
  router.delete("/:id", jwtMiddleware, EnvelopeController.deleteEnvelope);
  app.use("/envelopes", router);
};

export default initEnvelopesRoutes;
