import { NextFunction, Response, Request } from "express";
import { HttpException } from "../utils/exceptions/HttpException";

export default function NotFoundHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 400;
  return res.status(statusCode).json({
    message: err.message,
    status: err.status,
  });
}
