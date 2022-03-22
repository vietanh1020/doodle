import { Express } from "express";

import AuthRouter from "./auth.route";
import PollRouter from "./poll.route";
import { AuthMiddleware } from "../middlewares/auth.middleware";

function route(app: Express) {
  app.use("/poll", PollRouter);
  app.use("/", AuthRouter);
  // app.use(notFoundHandler);
  // app.use(errorHandler);
}

export default route;
