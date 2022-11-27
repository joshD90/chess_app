const assignColor = async (socket, io) => {
  //grab the dynamic room that our socket is part of
  const myRoom = [...socket.rooms][1];

  //see what all sockets are present in the room
  const socketsInRoom = await io.in(myRoom).fetchSockets();
  //if there's only one socket in the room then we don't need to assign turns
  if (socketsInRoom.length < 2) return;
  //get just id's
  const socketIds = socketsInRoom.map((socket) => socket.id);
  const randomNum = Math.floor(Math.random() * 2);
  //attach socket id to white or black keys
  const colorObj = {
    white: socketIds[randomNum],
    black: socketIds[1 - randomNum],
  };
  //send off the colors to the all sockets.
  io.to(myRoom).emit("color-set", colorObj);
};

module.exports = assignColor;
