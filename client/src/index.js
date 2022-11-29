import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayerContextProvider } from "./context/PlayerContext";
import { SocketProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PlayerContextProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </PlayerContextProvider>
  </React.StrictMode>
);
