import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Poll } from "../../types/poll";

function PollForm() {
  // const navigate = useNavigate();

  // navigate("/login");

  // const getCurentTime = () => {
  //   var now = new Date();
  //   now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  //   return now.toISOString().slice(0,16);
  // }

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

  const handleChange = (e: any) => {
    setPollData((prev: any) => {
      const { id, value } = e.target;
      return { ...prev, [id]: value };
    });

    // const questions: any[] = [];
    // setPollData({
    //   ...pollData,
    //   question: questions,
    // });
  };

  const [answers, setAnswers] = useState([0]);

  const [objAns, setObjAns] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const answersDatas = document.getElementsByName("answers");

    answersDatas.forEach((answersData) => {
      let id = answersData.getAttribute("id") as string;
      let value = answersData.getAttribute("value");
      console.log(value);

      setObjAns({
        [id]: value,
      });
      console.log(objAns);
    });

    try {
      console.log(objAns);
      console.log(pollData);
      // const access_token = state;
      // const response = await axios.post("http://localhost:3000/poll", {
      //   headers: {
      //     token: `Bearer ${access_token}`,
      //   },
      //   pollData,
      // });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleAddAnswer = (e: any) => {
    e.preventDefault();
    setAnswers((prev: any) => {
      return [...prev, answers.length];
    });
  };

  try {
  } catch (error) {}

  return (
    <div className="container">
      {/* <div className="row">
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
                    value={pollData.startAt}
                    onChange={handleChange}
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
                    value={pollData.endAt}
                    onChange={handleChange}
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
                value={pollData.image}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả cuộc khảo sát
              </label>
              <textarea
                className="form-control"
                id="description"
                value={pollData.description}
                onChange={handleChange}
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
                value={pollData.address}
                onChange={handleChange}
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
                value={pollData.question}
                onChange={handleChange}
              />
            </div>
            <label className="form-label">Đáp án </label>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="multipleVote"
                value={pollData.multipleVote}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="multipleVote">
                Cho phép chọn nhiều đáp án
              </label>
            </div>

            <div className="mb-3 answer-item">
              {answers.map((answer, index) => {
                return <Answers index={`${index + 1}`} />;
              })}
              <button className="btn btn-secondary " onClick={handleAddAnswer}>
                Thêm
              </button>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Tạo cuộc bình chọn
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default PollForm;
