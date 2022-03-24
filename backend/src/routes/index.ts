import { Express } from "express";
import errorHandler from "../middlewares/errorHandler";
import NotFoundHandler from "../middlewares/notFoundHandler";

import VoteRouter from "./vote.route";
import AuthRouter from "./auth.route";
import ResultRouter from "./result.route";
import PollRouter from "./poll.route";

function route(app: Express) {
  app.use("/mail",ResultRouter)
  app.use("/result",ResultRouter)
  app.use("/vote_poll", VoteRouter);
  app.use("/poll", PollRouter);
  app.use("/", AuthRouter);
  app.use(errorHandler);
  app.use(NotFoundHandler);
}

export default route;
