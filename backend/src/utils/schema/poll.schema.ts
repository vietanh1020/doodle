import { body } from "express-validator";

const pollSchema = [
  body("question").isEmpty().withMessage("Nhập câu hỏi"),
  body("startAt")
    .isEmpty()
    .withMessage("Thời gian bắt đầu không được để trống"),
  body("endAt").isEmpty().withMessage("Thời gian kết thúc không được để trống"),
  body("multipleVote").isEmpty().withMessage("Lỗi cho phép chọn nhiều đáp án "),
];

export { pollSchema};
