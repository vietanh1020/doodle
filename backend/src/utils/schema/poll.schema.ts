import { body } from "express-validator";

const pollSchema = [
  body("question").trim().not().isEmpty().withMessage("Nhập câu hỏi"),
  body("startAt")
    .not()
    .isEmpty()
    .withMessage("Thời gian bắt đầu không được để trống"),
  body("endAt")
    .not()
    .isEmpty()
    .withMessage("Thời gian kết thúc không được để trống"),
  body("multipleVote")
    .not()
    .isEmpty()
    .withMessage("Lỗi cho phép chọn nhiều đáp án "),
  body("answers")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Đáp án không được để trống"),
];

export { pollSchema };
