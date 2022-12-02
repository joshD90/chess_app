import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Board from "./gameMechanics/board/Board";
//this allows us to make sure that the socket has connected before launching the board
function BoardContainer() {
  const socket = useContext(SocketContext);
  return <div>{socket && <Board />}</div>;
}

export default BoardContainer;
