import "dotenv/config";
import express from "express";
import "reflect-metadata";
import helmet from "helmet";
import { errorHanlder } from "@/middleware/error.middleware";
import { route } from "@/routes";
import { AppDataSource } from "@/database/db.datasource";
import { swaggerInit } from "@/utils/documentation/swagger.util";
import { ruleRepository } from "@/container/rule.container";
import { RuleID } from "@/constants/rule-id.constants";
import { syncRulesToCache } from "@/utils/utils/sync-rules.util";
const cors = require("cors");
const config = require("config");
const session = require("express-session");
const morgan = require("morgan");
const corsOption = config.get("cors");
const useHelmet = config.get("helmet");
const morganFormat = config.get("morganFormat");
const enviroment = config.get("enviroment");
const server_config = config.get("server");
const root_api = config.get("API_VERSION");
const app = express();

//Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan(morganFormat || "dev"));
app.use(cors(corsOption));
if (useHelmet) {
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
    })
  );
}
app.use(session({ secret: process.env.JWT_SECRET, cookie: { maxAge: 60000 } }));

//Swagger init
const swaggerEnable = config.get("swagger");
if (swaggerEnable) {
  swaggerInit(app, root_api, server_config.port || 3000);
}

//Route
route(app, root_api);

//Error handler
app.use(errorHanlder);

//db connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database is connected");

    //Update rules to cache
    syncRulesToCache();

    const port = server_config.port || 3000;
    app.listen(port, () => {
      console.log(
        `Server is running on http://localhost:${port} in ${enviroment} mode`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
