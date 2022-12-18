import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("https://chess.joshuadanceywebdev.ie", {
      path: "/socket.io/",
    });
    // const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    console.log("new socket", newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
