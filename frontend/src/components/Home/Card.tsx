import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { httpClient } from "../../utils/httpClient";
import classes from "./Card.module.css";

export function Card(props: {
  image: string;
  startAt: string;
  endAt: string;
  id: number;
  question: string;
  description: string;
}) {
  const navigate = useNavigate();

  const handleRedirectDetails = (e: any) => {
    navigate(`/poll/detail/${props.id}`);
  };

  return (
    <div
      className="card"
      style={{ maxWidth: "100%" }}
      onClick={handleRedirectDetails}
    >
      <div
        className="image"
        style={{
          maxHeight: "180px",
          backgroundImage: `url('${props.image}')`,
          backgroundRepeat: "no-repeat",
          paddingTop: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <img src={props.image} style={{maxWidth:'100%', maxHeight:'100%', overflow: 'hidden'}} /> */}
      </div>
      <div className="card-body">
        <h5 className={`${classes.question}  "card-title"`}>
          {props.question}
        </h5>
        <p>{props.description}</p>
        <p>
          <strong>Bắt đầu:</strong> {formatDate(props.startAt)}
        </p>
        <p>
          <strong>Kết thúc:</strong> {formatDate(props.endAt)}
        </p>
      </div>
    </div>
  );
}
