import express from "express";
import { log } from "./utils/log.utils.js";
import initMiddlewares from "./middlewares/init.js";
import initRoutes from "./routes/router.js";
import connection from "./config/database.config.js";

const app = express();
const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    initMiddlewares(app);
    await initRoutes(app);
    await connection.sync();
  } catch (e) {
    console.error(e.message);
  }
};
await start();
app.listen(PORT, () => {
  console.log(`Serveur en cours d'execution:`);
  log(`Port ${PORT}`);
});
