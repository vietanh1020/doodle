import { useEffect, useState } from "react";
import { usePrivateRoute } from "../../hooks/auth/usePrivateRoute";
import validator from "validator";

import { Poll } from "../../types/poll";
import { PollMsg } from "../../types/PollMsg";
import { useNavigate } from "react-router-dom";
import { useGetSlug } from "../../hooks/help/useGetSlug";
import { httpClient } from "../../utils/httpClient";
import { formatDateDB } from "../../utils/formatDate";
import { updatePoll } from "../../hooks/poll/useUpdatePoll";

function PollUpdate() {
  usePrivateRoute();
  const navigate = useNavigate();
  const id = useGetSlug();
  const [poll, setPoll] = useState({
    startAt: "",
    endAt: "",
    image: "",
    description: "",
    address: "",
    question: "",
    multipleVote: false,
    answers: {},
  } as Poll);

  const [validationMsg, setValidationMsg] = useState([] as any);
  const [answers, setAnswers] = useState([""] as any);

  useEffect(() => {
    httpClient.get(`/poll/${id}`).then((response) => {
      const pollData = response.data.data;
      const objAnswers = JSON.parse(pollData.answers || "{}");
      let pollAnswers = [];
      for (let key in objAnswers) {
        pollAnswers.push(objAnswers[key]);
      }
      setPoll(pollData);
      setAnswers(pollAnswers);
    });
  }, []);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setPoll((prev: Poll) => {
      return { ...prev, [id]: value };
    });
  };

  const handleCheckMultipleVote = (e: any) => {
    setPoll((prev: Poll) => {
      return { ...prev, multipleVote: !poll.multipleVote };
    });
  };

  const handleAddAnswer = (e: any) => {
    e.preventDefault();
    setAnswers((prev: any) => {
      return [...prev, ""];
    });
  };

  const handleChangeAnswer = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;
    const newAnswer = [...answers];
    newAnswer[Number(id)] = value;
    setAnswers(newAnswer);
  };

  const handleDeleteAnswer = (e: any) => {
    e.preventDefault();
    let newAnswers = [...answers]; // clone simple
    newAnswers.splice(Number(e.target.id), 1);
    setAnswers(newAnswers);
  };

  const validateAll = () => {
    const msg: PollMsg = {
      startAt: "",
      endAt: "",
      question: "",
      answers: [""],
    };
    let result = true;
    if (validator.isEmpty(poll.startAt)) {
      msg.startAt = "Vui lòng chọn trường này!";
      result = false;
    } else {
      const dateSelect = new Date(poll.startAt);
      const dateNow = new Date();
      const timeSelect = dateSelect.setMinutes(dateSelect.getMinutes());
      const timeValid = dateNow.setMinutes(dateNow.getMinutes() + 5);
      if (timeValid > timeSelect) {
        result = false;
        msg.startAt =
          "Thời gian bắt đầu bình chọn phải sau hiện tại tối thiểu 5 phút";
      }
    }

    if (validator.isEmpty(poll.endAt)) {
      msg.endAt = "Vui lòng chọn trường này!";
      result = false;
    } else {
      const dateSelect = new Date(poll.endAt);
      const dateStart = new Date(poll.startAt);
      const timeSelect = dateSelect.setMinutes(dateSelect.getMinutes());
      const timeStart = dateStart.setMinutes(dateStart.getMinutes() + 10);
      if (timeStart > timeSelect) {
        result = false;
        msg.endAt =
          "Thời gian kết thúc phải sau thời gian bắt đầu tối thiểu 5p";
      }
    }

    if (validator.isEmpty(poll.question)) {
      result = false;
      msg.question = "Vui lòng nhập trường này!";
    }

    answers.forEach((answer: string, index: number) => {
      msg.answers.push("");
      if (validator.isEmpty(answers[index])) {
        result = false;
        msg.answers[index] = "Vui lòng nhập trường này!";
      }
    });
    setValidationMsg(msg);
    return result;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateAll();
    if (isValid) {
      let pollData = { ...poll };
      let objAns = {};
      answers.forEach((answer: string, index: number) => {
        Object.assign(objAns, { [`op${index + 1}`]: answer });
      });
      pollData.answers = JSON.stringify(objAns);

      console.log(pollData);

      const response = await updatePoll(pollData, id);

      if (response) {
        navigate("/");
      }
    }
  };

  return (
    <div className="container">
      {poll && (
        <div className="row">
          <form>
            <h1 style={{ textAlign: "center", padding: "8px" }}>
              Cập nhật bình chọn
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
                      onChange={handleChange}
                      id="startAt"
                      value={formatDateDB(poll.startAt)}
                    />
                    <p className="message-error">{validationMsg.startAt}</p>
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
                      onChange={handleChange}
                      value={formatDateDB(poll.endAt)}
                    />
                    <p className="message-error">{validationMsg.endAt}</p>
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
                  onChange={handleChange}
                  // value={poll.image}
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
                  value={poll.description}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={poll.address}
                />
              </div>
            </div>

            <div className="mb-3 form-group">
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Câu hỏi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  onChange={handleChange}
                  value={poll.question}
                />
                <p className="message-error">{validationMsg.question}</p>
              </div>
              <label className="form-label">Đáp án </label>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="multipleVote"
                  onChange={handleCheckMultipleVote}
                  checked={poll.multipleVote}
                />
                <label className="form-check-label" htmlFor="multipleVote">
                  Cho phép chọn nhiều đáp án
                </label>
              </div>

              <div className="mb-3 answer-item">
                {answers.map((answ: string, index: number) => {
                  return (
                    <div className="mb-3 answer-item" key={index}>
                      <div className="mb-3 answer-item row">
                        <div className="col-10">
                          <input
                            type="text"
                            className="form-control"
                            id={`${index}`}
                            name="answers"
                            value={answers[index]}
                            placeholder={`Đáp án ${index + 1}`}
                            onChange={handleChangeAnswer}
                          />
                        </div>
                        <div className="col-2">
                          <button
                            id={`${index}`}
                            className="btn btn-secondary "
                            onClick={handleDeleteAnswer}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                      {validationMsg && (
                        <p className="message-error">
                          {validationMsg.answers?.[index]}
                        </p>
                      )}
                    </div>
                  );
                })}

                <button
                  className="btn btn-secondary "
                  onClick={handleAddAnswer}
                >
                  Thêm
                </button>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Lưu
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PollUpdate;
