import { Request, Response, NextFunction } from "express";
import { ResponseDto } from "../dto/ResponseDto";
import { db } from "../models";
import { HttpException } from "../utils/exceptions/HttpException";

export async function getInfor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await db.User.findOne({ where: { id: req.user } });
  if (user) {
    throw new HttpException(401, "Chưa đăng nhập");
  }
  return res.status(200).json(new ResponseDto({ data: user }));
}
