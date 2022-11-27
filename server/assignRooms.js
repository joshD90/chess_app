const assignRooms = (socket, rooms) => {
  //move the map into an iterable form of array
  const roomsArray = [...rooms];
  //each socket has its own room by the name of the socket id, we remove these by filtering
  // any room that has a user with the same name as the socket inside it
  const actualRooms = roomsArray.filter((room) => !room[1].has(room[0]));
  if (actualRooms.length === 0) return socket.join("room1");
  //we run through all of the rooms and see whether they are full.  If they are full then we join another room
  const spareRoom = actualRooms.find((room) => room[1].size < 2);
  //if there happen to be any that aren't full just join this
  if (spareRoom) return socket.join(spareRoom[0]);
  //if there were no spare rooms then we assign a new room
  socket.join(newRoomName(actualRooms));
};

const newRoomName = (actualRooms) => {
  //grab the numbers of the room ie. 'room1' => 1
  const roomNums = actualRooms.map((room) => {
    return parseInt(room[0].slice(4, room[0].length));
  });
  //sort the array of integers into ascending order
  const sortedRooms = roomNums.sort((a, b) => a - b);

  //we run a loop 1 beyond the highest room number name.  If any of those roomnames are not in use, join that room
  for (let i = 1; 1 < sortedRooms[sortedRooms.length - 1] + 2; i++) {
    if (!sortedRooms.some((roomNum) => roomNum === i)) return `room${i}`;
  }
};

module.exports = assignRooms;
