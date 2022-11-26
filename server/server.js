const { Server } = require("socket.io");
const io = new Server(5000, { cors: { origin: ["http://localhost:3000"] } });

io.on("connection", (socket) => {
  console.log("you have connected through socket.io");
  socket.on("send-message", (message) => {
    socket.broadcast.emit("update-pieces", message);
  });
});
