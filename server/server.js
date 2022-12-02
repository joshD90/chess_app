const { Server } = require("socket.io");
const assignRooms = require("./assignRooms.js");
const assignColor = require("./assignColor.js");

//set up our socket on server 5000. Include cors as we are taking requests from another server
const io = new Server(5000, { cors: { origin: ["http://localhost:3000"] } });
//on connection we execute all included code
io.on("connection", (socket) => {
  console.log("you have connected through socket.io");
  //this grabs all the rooms that are currently attached to io
  const rooms = io.of("/").adapter.rooms;

  //when the user sends over his name we attach it to socket data
  socket.on("send-name", (name) => {
    socket.data.username = name;
    socket.emit("set-name", name);
  });

  socket.on("join-game", () => {
    console.log(socket.data, "in join room");
    //add this socket to dynamically set rooms
    assignRooms(socket, rooms);
    //get our room name so that we can emit events
    const myRoom = [...socket.rooms][1];
    //assign turn to player once room is filled
    assignColor(socket, io);
  });

  //on server recieving updated piece positions resend this out to other user in the room
  socket.on("send-message", (message) => {
    const myRoom = [...socket.rooms][1];
    socket.to(myRoom).emit("update-pieces", message);
  });
  //see whether there has been checkmate or not
  socket.on("checkmated", (obj) => {
    const myRoom = [...socket.rooms][1];
    const winningPlayer = obj.colorCheckmated === "white" ? "black" : "white";
    console.log("checkmated");
    io.to(myRoom).emit("player-win", {
      winningPlayer: winningPlayer,
      finalPosition: { black: obj.pieces.black, white: obj.pieces.white },
      method: "checkmate",
    });
  });
});
