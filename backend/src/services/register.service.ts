import { db } from "../models";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/users";

// [POST] /register
export class RegisterService {
  static async createUser(user: UserModel): Promise<UserModel | null> {
    {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);

      return await db.User.create({ ...user, password: hashed });
    }
  }
}
