//Tạo socket
import { db } from "../models";

export function socket(server: any) {
  const io = require("socket.io")(server, {
    cors: {
      origins: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    // TAO ROOM Va thong bao co nguoi join room
    socket.on("create-room", (data) => {
      socket.join(`${data.room}`);
      socket.emit("joined", data.room);
    });

    socket.on("client-send-chat-message", function (data) {
      const commentData = {
        fullName: data.fullname,
        content: data.content,
        pollId: data.pollId,
      };

      // db.Comment.create(commentData);

      // gui mess ve cho room
      io.sockets.in(`${data.pollId}`).emit("server-chat-message", data);
    });
  });
}
