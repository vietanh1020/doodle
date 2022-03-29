import { body } from "express-validator";

const schema = [
  body("email").isEmail().withMessage("Nhập địa chỉ email hợp lệ"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu phải dài hơn 8 kí tự"),
];

export { schema as registerSchema };
