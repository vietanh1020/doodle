import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { httpClient } from "../../utils/httpClient";

export function Card(props: {
  image: string;
  startAt: string;
  endAt: string;
  id: number;
  question: string;
  description: string;
  parentCallback: Function;
}) {
  const navigate = useNavigate();

  const handleEdit = (e: any) => {
    e.preventDefault();
    navigate(`/poll/${props.id}`);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const response = await httpClient.delete(`/poll/${props.id}`);
    if (response) {
      props.parentCallback(`${props.id}`);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.image} />
      <div className="card-body">
        <h5 className="card-title">{props.question}</h5>
        <p>{props.description}</p>
        <p>
          <strong>Bắt đầu:</strong> {formatDate(props.startAt)}
        </p>
        <p>
          <strong>Kết thúc:</strong> {formatDate(props.endAt)}
        </p>
        <div className="row">
          <div className="col">
            <button className="btn btn-warning" onClick={handleEdit}>
              Chỉnh sửa
            </button>
          </div>
          <div className="col">
            <button className="btn btn-danger" onClick={handleDelete}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}