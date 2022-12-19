const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // <-- put you react url here.
    methods: ["GET", "POST"],
  },
});
const winnerList = []

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

  socket.on("bingoClicked", (room, winner, values) => { 
    winnerList.push({
      username: winner, 
      values: values
    })
    io.to(room).emit("bingoMessageSent", winner, values, winnerList);
  });

  socket.on("winnersRequested", (room) => { 
    console.log(winnerList)
    console.log(room)
    io.to(room).emit("loadWinners", winnerList);
  });

});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
