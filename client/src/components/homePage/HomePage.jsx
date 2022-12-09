import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

import "./homeStyles.scss";

function HomePage() {
  const socket = useContext(SocketContext);
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [duration, setDuration] = useState(10);
  const [startGameHeight, setStartGameHeight] = useState(0);
  const navigate = useNavigate();

  const submitName = (e) => {
    e.preventDefault();
    if (!name || name === "") return;
    socket.emit("send-name", name);
    setStartGameHeight(40);
    setNameSubmitted(true);
  };
  const submitGame = (e) => {
    e.preventDefault();
    socket.emit("join-game", { duration: duration });
    navigate(`/game/${duration}`);
  };

  useEffect(() => {
    socket.on("set-name", (name) => {});
  }, [socket]);

  return (
    <div className="homeContainer">
      <div className="startDiv">
        <div className="nameDiv">
          {nameSubmitted === false ? (
            <form onSubmit={submitName}>
              <div className="inputHolder">
                <label>Please Enter Name Here</label>
                <input onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="buttonDiv">
                <button type="submit">Submit Name</button>
              </div>
            </form>
          ) : (
            <div className="greetingDiv">
              <h1>Welcome {name}</h1>
              <h3>Please Select a Game Duration and Join a Game</h3>
            </div>
          )}
        </div>
        <div className="startGameDiv" style={{ height: startGameHeight + "%" }}>
          <form onSubmit={submitGame}>
            <div className="selectDiv">
              <label>Select a game duration</label>
              <select onChange={(e) => setDuration(e.target.value)}>
                <option value={10}>10 mins</option>
                <option value={5}>5 mins</option>
              </select>
            </div>
            <div className="playButtonDiv">
              <button type="submit">Join Game</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
