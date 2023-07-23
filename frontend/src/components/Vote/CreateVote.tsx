import validator from "validator";

import { useEffect, useState } from "react";
import { createVote } from "../../hooks/vote/createVote";
import { formatDate } from "../../utils/formatDate";
import { httpClient } from "../../utils/httpClient";
import { ResultVote } from "./ResultVote";
import { Comment } from "./Comment";
import { FaClockRotateLeft, FaLocationDot, FaUserLarge } from "react-icons/fa6";

import { Button, Col, Row } from "react-bootstrap";

import "./Vote.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export function CreateVote(props: any) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("vote");
  const [user, setUser] = useState({ fullName: "", email: "" });
  const [poll, setPoll] = useState({} as any);
  const [createBy, setCreateBy] = useState({ firstName: "", lastName: "" });
  const [answers, setAnswers] = useState([""]);
  const [checked, setChecked] = useState([] as any[]);
  const [validationMsg, setValidationMsg] = useState({
    answers: "",
    fullName: "",
    email: "",
  });

  useEffect(() => {
    httpClient
      .get(`/vote/${props.id}`)
      .then((response) => {
        const vote = response.data.data;

        setCreateBy({ firstName: vote.firstName, lastName: vote.LastName });
        setPoll(vote.Polls[0]);

        let ansArr = [];
        const objAns = JSON.parse(vote.Polls[0].answers || "{}");
        for (let key in objAns) {
          ansArr.push(objAns[key]);
        }
        setAnswers(ansArr);
      })
      .catch((err) => {
        navigate("/404-not-found");
      });
  }, []);

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

  const handleSubmit = async (e: any) => {
    if (true) {
      let objAns = {};

      for (let val of checked) {
        Object.assign(objAns, JSON.parse(val || "{}"));
      }

      const result = await createVote(
        {
          fullName: localStorage.getItem("fullName") || "Anonymous",
          email: localStorage.getItem("email") || "",
          answer: JSON.stringify(objAns),
        },
        props.id
      );

      if (result) {
      }
    }
  };

  return (
    <div className="">
      <Box>
        <Banner
          style={{
            backgroundImage: `url("https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/362662188_661744419333758_5583109259605019522_n.jpg?stp=dst-jpg_p180x540&_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=wr6zxCOU4gMAX_2P3im&_nc_ht=scontent.fhan9-1.fna&oh=00_AfCXtMsVg6s2XitjMEpSb5X2gOiEPfTj5OsJgEiNsqhwuQ&oe=64C285CE")`,
          }}
        />
      </Box>

      <Poll className="d-flex mt-4">
        <PollInfo className="pb-2">
          <h1>Thông tin sự kiện</h1>
          <div>
            <div className="info-item d-flex">
              <FaLocationDot />
              <div>Sân bóng Mỹ Đình 2</div>
            </div>
            <div className="info-item d-flex">
              <FaUserLarge></FaUserLarge>
              <div>Võ Việt Anh</div>
            </div>
            <div className="info-item d-flex">
              <FaClockRotateLeft />

              {/* <div>{moment()}</div> */}
            </div>
            FaClockRotateLeft
            <div className="info-item d-flex">
              <div className="icon">icon</div>
              <div>Hạn đăng ký 06/06/2023, 12:00:00</div>
            </div>
            <div className="info-item d-flex">
              <div className="icon">icon</div>
              <div>Hạn đăng ký 06/06/2023, 12:00:00</div>
            </div>
          </div>
        </PollInfo>

        <Vote>
          <Question>{poll.question}</Question>

          {tab === "vote" && (
            <Row>
              {poll.multipleVote && (
                <TextSecond>Được phép chọn nhiều đáp án</TextSecond>
              )}
              {answers.map((ans: string, index: number) => {
                return (
                  <div className="col-6">
                    <div
                      className="form-group mb-4 me-2 rounded-pill "
                      key={index}
                    >
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id={`op${index + 1}`}
                        checked={checked.includes(
                          `{"op${index + 1}":"${ans}"}`
                        )}
                        value={ans}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`op${index + 1}`}
                        style={{ marginLeft: "20px" }}
                      >
                        {ans}
                      </label>
                    </div>
                  </div>
                );
              })}
              {validationMsg && (
                <p className="message-error">{validationMsg.answers}</p>
              )}

              <Button onClick={handleSubmit} variant="primary">
                Save
              </Button>
            </Row>
          )}
        </Vote>
      </Poll>
    </div>
  );
}

const Box = styled.div`
  position: relative;
  margin-top: 40px;
`;

const Banner = styled.div`
  border-radius: 8px;
  height: 400px;
  background-position: center center;
`;

const PollInfo = styled.div`
  box-shadow: rgb(25 33 45 / 25%) 10px 11px 52px;
  border-radius: 8px;
  overflow: hidden;
  left: 60px;
  width: 400px;
  background-color: #f8f6f6;

  h1 {
    background-color: #60d5c0;
    color: #fff;
    font-weight: 700;
    padding: 8px 16px;
    font-size: 20px;
  }

  .info-item {
    margin: 12px 16px;
    font-size: 14px;

    div {
      margin-left: 20px;
    }
  }

  .icon {
    width: 20px;
    margin-right: 20px;
  }
`;

const Question = styled.h2`
  color: rgb(9, 44, 76);
  font-size: 24px;
  text-align: center;
  font-weight: 500;
`;

const Vote = styled.div`
  margin-left: 100px;
  float: right;
`;

const Poll = styled.div`
  display: flex;
  margin-top: 80px;
`;

const TextSecond = styled.p`
  margin: 8px 4px;
  font-size: 14px;
  color: #333;
`;
