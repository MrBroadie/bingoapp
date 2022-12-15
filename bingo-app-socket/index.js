const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // <-- put you react url here.
    // methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room, username) => {
    socket.join(room);
    socket.username = username;
    const socketIds = Array.from(io.sockets.adapter.rooms.get(room));
    const listOfUsers = socketIds.map((id) => {
      const clientSocket = io.sockets.sockets.get(id);
      return { username: clientSocket.username, id: id };
    });
    io.to(room).emit("newUsernameAdded", listOfUsers);
  });

  socket.on("bingoClicked", (room, reveal) => { // listen for bingoClicked event, recieve room and reveal object from client. Reveal object should contain the user name?
    io.to(room).emit("bingoMessageSent", reveal);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
