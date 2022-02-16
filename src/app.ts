import "reflect-metadata";
import "./infra/dependencyinjection"
import express from "express";
import { createConnection } from "typeorm";
import { studyScheduleRoute } from "./infra/routes/StudyScheduleRoutes";

const app = express();

const startApp = async () => {
  // typeorm connection
  await createConnection();

  // configs
  app.use(express.json());

  // routes
  app.use("/studyschedule", studyScheduleRoute)

  // port
  app.listen(process.env.APP_PORT, () => console.log("server running on port 3333"));
};

startApp();
