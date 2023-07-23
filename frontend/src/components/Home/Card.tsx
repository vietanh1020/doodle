import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import classes from "./Card.module.css";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { httpClient } from "../../utils/httpClient";
import { Button } from "@material-ui/core";

export function Card(props: {
  image: string;
  startAt: string;
  endAt: string;
  id: number;
  question: string;
  description: string;
  address: string;
  totalVote: number;
}) {
  const navigate = useNavigate();

  const handleEdit = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/poll/${id}`);
  };

  const handleDelete = async (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    window.location.href = window.location.href;
    await httpClient.delete(`/poll/${id}`);
    navigate("/home");
  };

  const imageDefault =
    "https://i.pcmag.com/imagery/articles/009cW7ZeBNU4LFtBCTnxGII-3..v1660320145.jpg";

  return (
    <div className="card mb-4" style={{ maxWidth: "100%" }}>
      <div
        className="image col col-4  rounded-xl"
        style={{
          maxHeight: "180px",
          backgroundImage: `url('${props.image ? props.image : imageDefault}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "200px",
          width: "100%",
          backgroundSize: "cover",
        }}
      />

      <div className="col px-4 pt-4">
        <h5 className={`${classes.question}  card-title pb-2`}>
          {props.question}
        </h5>
        <p className="text-nowrap">
          <FaClock />
          <span className="ms-2 text-nowrap">
            Kết thúc: {`${formatDate(props.startAt)} `}
          </span>
        </p>
        <p className="text-nowrap">
          <FaLocationDot />
          <span className="ms-2 text-nowrap">{props.address}</span>
        </p>

        <div className="row ">
          <div className="col">
            <Button
              variant="outlined"
              onClick={(e) => {
                handleEdit(e, props.id.toString());
              }}
            >
              Chỉnh sửa
            </Button>
          </div>

          <div className="col">
            <Button
              variant="outlined"
              color="secondary"
              onClick={(e) => {
                handleDelete(e, props.id.toString());
              }}
            >
              Xóa
            </Button>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
}
