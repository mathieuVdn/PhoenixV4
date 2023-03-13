import cors from "cors";
import helmet from "helmet";
import express from "express";

const initMiddlewares = (app) => {
  // CORS
  const corsOrigin = "*";

  const corsOptions = {
    origin: corsOrigin,
  };

  app.use(cors(corsOptions));
  app.use(helmet());

  // parse requests of content-type - application/json
  app.use(express.json({ limit: "50mb" }));
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
};

export default initMiddlewares;