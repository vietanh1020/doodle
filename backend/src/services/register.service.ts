import { db } from "../models";
import bcrypt from "bcryptjs";

// [POST] /register
export class RegisterService {
  static async createUser(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.password, salt);

    const newUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: hashed,
    };

    return await db.User.create(newUser);
  }
}


