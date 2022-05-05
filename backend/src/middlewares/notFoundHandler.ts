import { NextFunction, Response, Request } from "express";
import { HttpException } from "../utils/exceptions/HttpException";
export default function NotFoundHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(404).json({
    message: err.message,
    status: err.status,
  });
}
