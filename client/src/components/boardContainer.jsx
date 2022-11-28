import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import Board from "./gameMechanics/board/Board";
import DummyBoard from "./gameMechanics/DummyBoard";

function BoardContainer() {
  const socket = useContext(SocketContext);
  return <div>{socket && <Board />}</div>;
}

export default BoardContainer;