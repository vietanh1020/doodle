import { NextFunction, Response, Request } from "express";
import { HttpException } from "../utils/exceptions/HttpException";

export default function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    message: err.message,
    status: statusCode,
  });
}
