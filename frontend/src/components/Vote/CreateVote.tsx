import validator from "validator";

import { useEffect, useState } from "react";
import { createVote } from "../../hooks/vote/createVote";
import { formatDate } from "../../utils/formatDate";
import { httpClient } from "../../utils/httpClient";
import { ResultVote } from "./ResultVote";
import { Comment } from "./Comment";

import "./Vote.css";

export function CreateVote(props: any) {
  const [voted, setVoted] = useState(false);
  const [user, setUser] = useState({ fullName: "", email: "" });
  const [poll, setPoll] = useState({} as any);
  const [createBy, setCreateBy] = useState({ firstName: "", lastName: "" });
  const [answers, setAnswers] = useState([""]);
  const [checked, setChecked] = useState([] as any);
  const [validationMsg, setValidationMsg] = useState({
    answers: "",
    fullName: "",
    email: "",
  });

  useEffect(() => {
    httpClient.get(`/vote/${props.id}`).then((response) => {
      const vote = response.data.data;

      setCreateBy({ firstName: vote.firstName, lastName: vote.LastName });
      setPoll(vote.Polls[0]);

      let ansArr = [];
      const objAns = JSON.parse(vote.Polls[0].answers || "{}");
      for (let key in objAns) {
        ansArr.push(objAns[key]);
      }
      setAnswers(ansArr);
    });
  }, []);

  const validateAll = () => {
    const msg = {
      answers: "",
      fullName: "",
      email: "",
    };
    let result = true;

    if (checked.length == 0) {
      result = false;
      msg.answers = "Vui lòng chọn đáp án!";
    }

    if (validator.isEmpty(user.fullName)) {
      result = false;
      msg.fullName = "Vui lòng nhập trường này!";
    }

    if (validator.isEmpty(user.email)) {
      result = false;
      msg.email = "Vui lòng nhập trường này!";
    }

    setValidationMsg(msg);
    return result;
  };

  const handleChange = (e: any) => {
    const ans = e.target.value;
    const id = e.target.id;
    const value = JSON.stringify({ [id]: ans });

    setChecked((prev: any) => {
      const isChecked = checked.includes(value);

      if (poll.multipleVote) {
        if (isChecked) {
          return checked.filter((item: string) => {
            return item != value;
          });
        } else return [...prev, value];
      } else {
        return [value];
      }
    });
  };

  const handleChangeUser = (e: any) => {
    const { id, value } = e.target;
    setUser((prev: any) => {
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (e: any) => {
    const isValid = validateAll();

    if (isValid) {
      let objAns = {};

      for (let val of checked) {
        Object.assign(objAns, JSON.parse(val || "{}"));
      }

      const result = await createVote(
        {
          fullName: user.fullName,
          email: user.email,
          answer: JSON.stringify(objAns),
        },
        props.id
      );

      if (result) {
        localStorage.setItem("isVoted", "true");
        setVoted(true);
      }
    }
  };

  return (
    <div className="">
      <div className="header mt-3" style={{ textAlign: "center" }}>
        <h3>{poll.question}</h3>
        <p>{poll.description}</p>
        <strong>
          Được tạo bởi: {`${createBy.firstName} ${createBy.lastName}`}
        </strong>
        <p style={{ margin: "0" }}>
          <strong>Kết thúc: </strong>
          {formatDate(poll.endAt)}
        </p>
        <strong>Địa chỉ</strong> {poll.address}
      </div>

      <div
        className="main mt-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "832px",
          margin: "0 auto",
        }}
      >
        <div
          className="poll-img"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src="http://booking.bhdstar.vn/CDN/media/entity/get/FilmPosterGraphic/HO00002422?referenceScheme=HeadOffice&allowPlaceHolder=true&height=500"
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "280px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div
          className="answer"
          style={{ alignItems: "center", marginLeft: "20px" }}
        >
          {!voted && (
            <div className="answer">
              <h6 style={{ textAlign: "center" }}>Bình chọn</h6>
              {poll.multipleVote && <p>Được phép chọn nhiều đáp án</p>}
              {answers.map((ans: string, index: number) => {
                return (
                  <div className=" form-group mt-3" key={index}>
                    <input
                      className="form-check-input "
                      type="checkbox"
                      id={`op${index + 1}`}
                      checked={checked.includes(`{"op${index + 1}":"${ans}"}`)}
                      value={ans}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`op${index + 1}`}
                      style={{ marginLeft: "10px" }}
                    >
                      {ans}
                    </label>
                  </div>
                );
              })}
              {validationMsg && (
                <p className="message-error">{validationMsg.answers}</p>
              )}

              <div className="form-input row">
                <div className="mt-3 col">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    onChange={handleChangeUser}
                    value={user.fullName}
                    placeholder="Enter full name"
                  />
                  {validationMsg && (
                    <p className="message-error">{validationMsg.fullName}</p>
                  )}
                </div>

                <div className="mt-3 col">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleChangeUser}
                    value={user.email}
                    placeholder="Enter email"
                  />
                  {validationMsg && (
                    <p className="message-error">{validationMsg.email}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                style={{ textAlign: "center" }}
                className="btn btn-primary mt-3"
                onClick={handleSubmit}
              >
                Vote
              </button>
            </div>
          )}
          
          {voted && <ResultVote id={props.id} />}
        </div>
      </div>
      <div className="comment">{<Comment fullName={user.fullName} />}</div>
    </div>
  );
}
