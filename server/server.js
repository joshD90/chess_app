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

  //add this socket to dynamically set rooms
  assignRooms(socket, rooms);
  //get our room name so that we can emit events
  const myRoom = [...socket.rooms][1];
  //assign turn to player once room is filled
  assignColor(socket, io);

  //when the user sends over his name we attach it to socket data
  socket.on("send-name", (name) => {
    console.log(name, "name from client");
    socket.data.username = name;
  });

  //on server recieving updated piece positions resend this out to other user in the room
  socket.on("send-message", (message) => {
    socket.to(myRoom).emit("update-pieces", message);
  });
});
