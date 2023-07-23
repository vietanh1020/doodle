import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
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
      className="d-flex mb-4"
      style={{ maxWidth: "100%" }}
      onClick={handleRedirectDetails}
    >
      <div
        className="image col col-4  rounded-xl"
        style={{
          maxHeight: "180px",
          backgroundImage: `url('https://i.pcmag.com/imagery/articles/009cW7ZeBNU4LFtBCTnxGII-3..v1660320145.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "200px",
          width: "100%",
          backgroundSize: "cover",
        }}
      />

      <div className="col col-8">
        <h5 className={`${classes.question}  "card-title"`}>
          {props.question}
        </h5>
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
