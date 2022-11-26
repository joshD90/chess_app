import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Board from "./gameMechanics/board/Board";

function BoardContainer() {
  const socket = useContext(SocketContext);
  return <div>{socket && <Board />}</div>;
}

export default BoardContainer;
