import { Express } from "express";
import errorHandler from "../middlewares/errorHandler";
import NotFoundHandler from "../middlewares/notFoundHandler";

import AuthRouter from "./auth.route";
import PollRouter from "./poll.route";
import VoteRouter from "./vote.route";

function route(app: Express) {
  app.use("/poll/:pollId/vote", VoteRouter);
  app.use("/poll", PollRouter);
  app.use("/", AuthRouter);
  app.use(errorHandler);
  app.use(NotFoundHandler);
}

export default route;
