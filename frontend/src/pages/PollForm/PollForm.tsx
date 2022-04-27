import axios from "axios";
import { useState } from "react";
import { usePrivateRoute } from "../../hooks/auth/usePrivateRoute";
import { useGetSlug } from "../../hooks/help/useGetSlug";

import { Poll } from "../../types/poll";

function PollForm() {
  const id =  useGetSlug()
  usePrivateRoute()
  const [pollData, setPollData] = useState({
    startAt: "",
    endAt: "",
    image: "",
    description: "",
    address: "",
    question: "",
    multipleVote: true,
    answers: [],
  } as Poll);

  return (
    <div className="container">
      <div className="row">
        <form>
          <h1 style={{ textAlign: "center", padding: "8px" }}>
            Tạo cuộc bình chọn
          </h1>
          <div className="mb-3 form-group">
            <div className="row mt-4 mb-3">
              <div className="col">
                <div className=" mb-3">
                  <label htmlFor="startAt" className="form-label">
                    Bắt đầu
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="startAt"
                    name="birthdaytime"
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="endAt" className="form-label">
                    Kết thúc
                  </label>
                  <input
                    id="endAt"
                    type="datetime-local"
                    className="form-control"
                    name="endAt"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Ảnh minh họa
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả cuộc khảo sát
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={2}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
              />
            </div>
          </div>

          <div className="mb-3 form-group">
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Câu hỏi{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="question"
              />
            </div>
            <label className="form-label">Đáp án </label>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="multipleVote"
              />
              <label className="form-check-label" htmlFor="multipleVote">
                Cho phép chọn nhiều đáp án
              </label>
            </div>

            <div className="mb-3 answer-item">
              {/* {answers.map((answer, index) => {
                return <Answers index={`${index + 1}`} />;
              })} */}
              <button className="btn btn-secondary ">
                Thêm
              </button>
            </div>
          </div>

          <button className="btn btn-primary">
            Tạo cuộc bình chọn
          </button>
        </form>
      </div>
    </div>
  );
}

export default PollForm;
