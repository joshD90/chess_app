import React, { useContext, useState, useEffect, useRef } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./homeStyles.scss";

function HomePage() {
  const socket = useContext(SocketContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(10);
  const [serverName, setServerName] = useState("");
  const [mousePointer, setMousePointer] = useState({ x: "", y: "" });
  const startDivRef = useRef();

  const submitName = (e) => {
    e.preventDefault();
    if (!name || name === "") return;
    socket.emit("send-name", name);
  };
  const submitGame = (e) => {
    e.preventDefault();

    socket.emit("join-game");
  };

  useEffect(() => {
    socket.on("set-name", (name) => {
      console.log(name, "name in set-name");
      setServerName(name + "is my name");
    });
  }, [socket]);

  useEffect(() => {
    const element = startDivRef.current;
    const doMouseMove = (e) => {
      console.log(e.clientX, e.clientY);
      setMousePointer({ x: e.clientX, y: e.clientY });
    };
    element.addEventListener("mousemove", doMouseMove);
    return () => element.removeEventListener("mousemove", doMouseMove);
  }, []);

  return (
    <div className="homeContainer">
      <p>{mousePointer.x + "        " + mousePointer.y}</p>
      <h1>{serverName}</h1>
      <div className="startDiv" ref={startDivRef}>
        <div className="nameDiv">
          <form onSubmit={submitName}>
            <div className="inputHolder">
              <label>Please Enter Name Here</label>
              <input onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="buttonDiv">
              <button type="submit">Submit Name</button>
            </div>
          </form>
        </div>
        <div className="startGameDiv">
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
