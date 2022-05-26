import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/Navbar/NavBar";
import { useGetSlug } from "../../hooks/help/useGetSlug";
import { formatDate, formatDateDB } from "../../utils/formatDate";
import { httpClient } from "../../utils/httpClient";
import classes from "./pollDetail.module.css";

const { API_URL = "http://localhost:3001" } = process.env;
const { FE_URL = "http://localhost:3000" } = process.env;

export function PollDetail() {
  const [poll, setPoll] = useState({} as any);
  const [answers, setAnswers] = useState([] as any[]);
  const [isCoppy, setCoppy] = useState(false);

  const navigate = useNavigate();
  const id = useGetSlug();

  const handleShareLink = (e: any) => {
    e.stopPropagation();
    setCoppy(true);
    navigator.clipboard.writeText(e.target.value);
  };

  const handSendMail = async (e: any) => {
    await httpClient.post(`/mail/${id}`);
    alert("Đã gửi mail");
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    navigate(`/poll/${id}`);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    await httpClient.delete(`/poll/${id}`);
    navigate("/home");
  };

  const fetchData = () => {
    httpClient
      .get(`/poll/${id}`)
      .then((response) => {
        setPoll(response.data.data);

        const pollData = response.data.data;

        const objAnswers = JSON.parse(pollData.answers || "{}");
        let pollAnswers = [];

        for (let key in objAnswers) {
          pollAnswers.push(objAnswers[key]);
        }
        setAnswers(pollAnswers);
      })
      .catch((err) => navigate("/404-not-found"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <NavBar />
      {poll && (
        <div className="container mt-3">
          <div className="col-md-12">
            <section className={classes.panel}>
              <div className={`row ${classes.panel_body}`}>
                <div className="col-md-6">
                  <div className={classes.pro_img_details}>
                    <img src={`${API_URL}/images/${poll.image}`} alt="" />
                  </div>
                </div>

                <div className="col-md-6" style={{ paddingLeft: "12px" }}>
                  <h2 className="text-center mt-3">{poll.question}</h2>

                  <p>{poll.description}</p>

                  <div className="input-group mb-3">
                    <div className="form-group">
                      <a
                        href={`${FE_URL}/vote/${id}`}
                      >{`${FE_URL}/vote/${id}`}</a>
                    </div>

                    <div className="input-group-append">
                      <div className="col" style={{ marginLeft: "20px" }}>
                        <button
                          className="btn btn-primary"
                          onClick={handleShareLink}
                          value={`${FE_URL}/vote/${id}`}
                        >
                          Share invite
                        </button>
                      </div>
                    </div>
                  </div>
                  {isCoppy && (
                    <p
                      className="text-center"
                      style={{
                        backgroundColor: "#00FF66",
                        borderRadius: "10px",
                        maxWidth: "250px",
                      }}
                    >
                      Đã coppy vào clipboard !
                    </p>
                  )}

                  <div className="row">
                    <div className="col">
                      <strong>Bắt đầu:</strong>
                      <p>{formatDate(poll.startAt)}</p>
                    </div>
                    <div className="col">
                      <strong>Kết thúc:</strong>
                      <p>{formatDate(poll.endAt)}</p>
                    </div>
                  </div>

                  <div className="m-bot15">
                    <strong>Địa chỉ : </strong>
                    <span className="pro-price"> {poll.address}</span>
                  </div>

                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      readOnly
                      checked={poll.multipleVote}
                    />
                    <label className="form-check-label">
                      Cho phép chọn nhiều đáp án!
                    </label>
                  </div>

                  <div className="mt-3">
                    {answers.map((answer: string, index: number) => {
                      return (
                        <div className="mt-1" key={index}>
                          <strong>{`Đáp án ${index + 1}:    `}</strong>
                          {answer}
                        </div>
                      );
                    })}
                  </div>

                  <div className="row mt-3">
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        onClick={handSendMail}
                      >
                        Gửi kết quả bình chọn
                      </button>
                    </div>

                    <div className="col">
                      <button className="btn btn-link" onClick={handleEdit}>
                        Chỉnh sửa
                      </button>
                    </div>

                    <div className="col">
                      <button className="btn btn-link" onClick={handleDelete}>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
