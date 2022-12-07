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

  socket.on("disconnecting", () => {
    const roomLeft = Array.from(socket.rooms)[1];
    io.to(roomLeft).emit("player-disconnect");
  });

  //when the user sends over his name we attach it to socket data
  socket.on("send-name", (name) => {
    socket.data.username = name;
    socket.emit("set-name", name);
  });

  socket.on("join-game", ({ duration }) => {
    if (Array.from(socket.rooms)[1]) socket.leave(Array.from(socket.rooms)[1]);
    //add this socket to dynamically set rooms
    assignRooms(socket, rooms, duration);
    //get our room name so that we can emit events
    const myRoom = [...socket.rooms][1];

    //assign turn to player once room is filled
    assignColor(socket, io);
  });

  //on server recieving updated piece positions resend this out to other user in the room
  socket.on("send-message", (message) => {
    const myRoom = [...socket.rooms][1];
    socket.to(myRoom).emit("update-pieces", message);
    socket.to(myRoom).emit("test-listener", { message: "hello" });
  });
  //see whether there has been checkmate or not
  socket.on("checkmated", (obj) => {
    const myRoom = [...socket.rooms][1];
    const winningPlayer = obj.colorCheckmated === "white" ? "black" : "white";
    //send out the object to both players in the room
    io.to(myRoom).emit("player-win", {
      winningPlayer: winningPlayer,
      finalPosition: { black: obj.pieces.black, white: obj.pieces.white },
      method: "checkmate",
      taken: { white: obj.taken.white, black: obj.taken.black },
    });
  });
  //see whether there has been a stalemate
  socket.on("drawn", (obj) => {
    console.log("drawn");
    const myRoom = [...socket.rooms][1];
    io.to(myRoom).emit("player-draw", {
      finalPosition: { black: obj.pieces.black, white: obj.pieces.white },
      method: obj.method,
      taken: { white: obj.taken.white, black: obj.taken.black },
    });
  });
});
