import { NextFunction, Response, Request } from "express";
import { HttpException } from "../exceptions/HttpException";
export default function NotFoundHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(400).json({
    message: err.message,
    status: err.status,
  });
}
