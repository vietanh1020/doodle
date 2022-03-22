import { NextFunction, Response, Request } from "express";
export default function errorHandler(
  err: Error,
  res: Response,
  next: NextFunction
) {
  if (err.message) {
    return res.status(403).json({ error: err.message });
  }

  return next(err);
}
