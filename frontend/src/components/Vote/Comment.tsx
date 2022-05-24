import { useGetSlug } from "../../hooks/help/useGetSlug";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

// CONNECT TO SERVER
const { API_URL = "http://localhost:3001" } = process.env;
const socket = io(API_URL);

export function Comment(props: any) {
  const id = useGetSlug();
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([] as any[]);

  useEffect(() => {
    // socket yeu cau join room
    socket.emit("create-room", { room: id });

    // lang nghe cos nguoi join room
    socket.on("joined", function (data: any) {});

    handleGetMessage();
  }, []);

  const handleSendMessage = (e: any) => {
    socket.emit("client-send-chat-message", {
      fullname: props.fullName,
      content: message,
      pollId: id,
    });

    setMessage("");
  };

  const handleChangeMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleGetMessage = () => {
    socket.on("server-chat-message", function (comment: any) {
      setComments((prev: any[]) => {
        return [...prev, comment];
      });
    });
  };

  return (
    <div className="comment">
      <div className="container mt-5">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-8">
            <div className="headings d-flex justify-content-between align-items-center mb-3">
              <h5>Bình luận({comments.length})</h5>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <input
                id="message"
                style={{ marginRight: "10px" }}
                placeholder="Viết bình luận ...."
                value={message}
                className="form-control"
                onChange={handleChangeMessage}
              />

              <button
                className="btn btn-primary"
                id="sendMessage"
                onClick={handleSendMessage}
              >
                Gửi
              </button>
            </div>

            {comments.map((comment: any, index: number) => {
              return (
                <div
                  key={index}
                  className="card mt-1"
                  style={{ padding: "8px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <strong>{comment.fullname}:</strong>
                      <span style={{ marginLeft: "20px" }}>
                        {comment.content}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
