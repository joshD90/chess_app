export const socketListenerOn = (socket) => {
  socket.on("test-listener", () => {
    console.log("THIS IS THE TEST LISTENER FIRING");
  });
};

export const socketListenerOff = (socket) => {
  socket.off("test-listener");
};
