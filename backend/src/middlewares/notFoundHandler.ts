// import { Handler } from 'express';
// export const NotFoundHandler: Handler = (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message: 'Page not found!',
//   });
// };


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
