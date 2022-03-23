import { NextFunction, Response, Request } from "express";
import { HttpException } from "../exceptions/HttpException";
export default function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.status >= 500)
    return res.status(500).json({
      message: err.message,
      status: err.status,
    });
  next(err);
}
