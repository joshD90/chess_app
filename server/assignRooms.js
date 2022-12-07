const assignRooms = (socket, rooms, duration) => {
  //move the map into an iterable form of array
  const roomsArray = [...rooms];
  //each socket has its own room by the name of the socket id, we remove these by filtering
  // any room that has a user with the same name as the socket inside it
  const actualRooms = roomsArray.filter((room) => !room[1].has(room[0]));
  if (actualRooms.length === 0) return socket.join(`room1-${duration}`);
  //we run through all of the rooms and see whether they are full.  If they are full then we join another room
  const spareRoom = actualRooms.find((room) => {
    console.log(room[0].split("-")[1], "duration");
    return room[1].size < 2 && room[0].split("-")[1] == duration;
  });

  //if there happen to be any that aren't full just join this
  if (spareRoom) return socket.join(spareRoom[0]);
  //if there were no spare rooms then we assign a new room
  const newRoom = `${newRoomName(actualRooms)}-${duration}`;

  socket.join(newRoom);
  //we check to see after 5 seconds whether another person has joined this new room and then we
  //go through the loop to reassign things again
  setTimeout(() => {
    const myRoom = rooms.get(newRoom);
    if (myRoom.size === 1) {
      socket.leave(newRoom);
      assignRooms(socket, rooms, duration);
    }
  }, [5000]);
};

const newRoomName = (actualRooms) => {
  //grab the numbers of the room ie. 'room1' => 1
  const roomNums = actualRooms.map((room) => {
    return parseInt(room[0].slice(4, room[0].length).split("-")[0]);
  });
  //sort the array of integers into ascending order
  const sortedRooms = roomNums.sort((a, b) => a - b);

  //we run a loop 1 beyond the highest room number name.  If any of those roomnames are not in use, join that room
  for (let i = 1; 1 < sortedRooms[sortedRooms.length - 1] + 2; i++) {
    if (!sortedRooms.some((roomNum) => roomNum === i)) return `room${i}`;
  }
};

module.exports = assignRooms;
