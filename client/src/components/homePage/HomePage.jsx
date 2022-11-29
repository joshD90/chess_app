import React, { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./homeStyles.scss";

function HomePage() {
  const socket = useContext(SocketContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(10);

  const submitName = (e) => {
    e.preventDefault();
    if (!name || name === "") return;
    socket.emit("send-name", name);
  };
  const submitGame = (e) => {
    e.preventDefault();
    console.log(socket.data, "in submit game button");
  };

  return (
    <div className="homeContainer">
      <div className="startDiv">
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
