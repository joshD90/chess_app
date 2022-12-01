const assignColor = async (socket, io) => {
  //grab the dynamic room that our socket is part of
  const myRoom = [...socket.rooms][1];

  //see what all sockets are present in the room
  const socketsInRoom = await io.in(myRoom).fetchSockets();
  //if there's only one socket in the room then we don't need to assign turns
  if (socketsInRoom.length < 2) return;
  //get just id's
  const socketIds = socketsInRoom.map((socket) => {
    return { id: socket.id, name: socket.data.username };
  });

  const randomNum = Math.floor(Math.random() * 2);
  //attach socket id to white or black keys
  const colorObj = {
    white: socketIds[randomNum].id,
    black: socketIds[1 - randomNum].id,
    names: [
      { name: socketIds[0].name, id: socketIds[0].id },
      { name: socketIds[1].name, id: socketIds[1].id },
    ],
  };
  //send off the colors to the all sockets.
  io.to(myRoom).emit("color-set", colorObj);
};

module.exports = assignColor;
