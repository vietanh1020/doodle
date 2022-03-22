import { Express } from "express";

import AuthRouter from "./auth.route";
import PollRouter from "./poll.route";

function route(app: Express) {
  // app.use(errorHandler);
  app.use("/poll", PollRouter);
  app.use("/", AuthRouter);
  // app.use(notFoundHandler);
}

export default route;
