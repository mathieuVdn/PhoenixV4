import initUsersRoutes from "./user.route.js";
import initEnvelopesRoutes from "./envelope.route.js";
import initOperationsRoutes from "./operation.route.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
  initEnvelopesRoutes(app, sanitizeMiddleware);
  initOperationsRoutes(app, sanitizeMiddleware);
};

export default initRoutes;
