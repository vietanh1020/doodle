import { useState } from "react";
import validator from "validator";

import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/Navbar/NavBar";
import { UseCreatePoll } from "../../hooks/poll/useCreatePoll";
import { PollMsg } from "../../types/PollMsg";
import { Poll } from "../../types/poll";
import { FileDropZone } from "../../components/fileDropZone";

function PollCreate() {
  const navigate = useNavigate();

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
  const [answers, setAnswers] = useState([""] as any[]);

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

      if (dateSelect.getTime() - dateNow.getTime() < -60000) {
        result = false;
        msg.startAt =
          "Thời gian bắt đầu bình chọn phải sau hiện tại tối thiểu 1 phút";
      }
    }

    if (validator.isEmpty(poll.endAt)) {
      msg.endAt = "Vui lòng chọn trường này!";
      result = false;
    } else {
      const dateSelect = new Date(poll.endAt);
      const dateStart = new Date(poll.startAt);

      if (dateSelect.getTime() - dateStart.getTime() < -300000) {
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
      let pollData = poll;
      let objAns = {};
      answers.forEach((answer: string, index: number) => {
        Object.assign(objAns, { [`op${index + 1}`]: answer });
      });
      pollData.answers = JSON.stringify(objAns);
      const response = await UseCreatePoll(pollData);
      if (response) {
        navigate("/");
      }
    }
  };

  return (
    <div className="app">
      <NavBar />

      <div className="container">
        <div className="row">
          <form encType="multipart/form-data">
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
                      onChange={handleChange}
                      id="startAt"
                      value={poll.startAt}
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
                      value={poll.endAt}
                    />
                    <p className="message-error">{validationMsg.endAt}</p>
                  </div>
                </div>
              </div>

              {poll.image ? (
                <img src={poll.image} alt="" />
              ) : (
                <FileDropZone
                  onSave={(url: string) => {
                    setPoll((prev) => ({ ...prev, image: url }));
                  }}
                />
              )}

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
              <div className="mb-3 form-check d-flex">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="multipleVote"
                  onChange={handleCheckMultipleVote}
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
              Tạo cuộc bình chọn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PollCreate;
