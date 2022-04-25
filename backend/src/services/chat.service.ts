//Tạo socket
import { createServer } from 'http';
import {db} from '../models'

export function socket(app: any){
  const httpServer = createServer(app);
  const io = require("socket.io")(httpServer);
  io.on("connection", function (socket) {
    console.log("có kêt nối");
    // TAO ROOM Va thong bao co nguoi join room
    socket.on("create-room", (data) => {
      socket.join(`${data.room}`);
      socket.emit('joined', data.room );
      console.log(socket.adapter.rooms)
    });
  
    socket.on("client-send-chat-message", function (data ) {
      // var sql = `INSERT INTO comments(fullName, content, pollId) VALUES ( '${data.fullname}','${data.content}', ${data.pollId})`;
      // db.Comment.query(sql, function (err, results) {
      //   if (err) throw err;
      // });
  
      // gui mess ve cho room
      io.sockets.in(`${data.pollId}`).emit("server-chat-message", data);
    });
  });

}
