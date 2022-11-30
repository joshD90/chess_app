import React, { useEffect, useRef, useContext, useState } from "react";
import "./BoardStyles.scss";
import Canvas from "../../Canvas";
import { createGrid } from "./createGrid";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { SocketContext } from "../../../context/SocketContext";
import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";

const width = 600;

function Board() {
  const socket = useContext(SocketContext);
  const [passableGrid, setPassableGrid] = useState(null);
  const playerRef = useRef({ turn: false, color: "" });
  //create a link to the actual DOM canvas element
  const canvasRef = useRef();
  let grid;
  useEffect(() => {
    socket.on("color-set", (colorObj) => {
      if (socket.id === colorObj.white) {
        playerRef.current.turn = true;
        playerRef.current.color = "white";
        grid = createGrid(width, "white");
        setPassableGrid(grid);
      }
      if (socket.id === colorObj.black) {
        playerRef.current.turn = false;
        playerRef.current.color = "black";
        grid = createGrid(width, "black");
        setPassableGrid(grid);
      }
    });
    socket.on("update-pieces", (pieces) => {
      playerRef.current.turn = true;
      whitePieces.splice(0, whitePieces.length, ...pieces.white);
      blackPieces.splice(0, blackPieces.length, ...pieces.black);
    });
    return () => {
      socket.off("update-pieces");
      socket.off("color-set");
    };
  }, []);

  //handles our event listeners
  useEffect(() => {
    //get a ref of our div surrouding the canvas
    const element = canvasRef.current;
    //drop the piece
    const doMouseUp = (e) => {
      deactivatePiece(e, socket, playerRef, grid);
    };
    //activate piece
    const doMouseDown = (e) => {
      console.log(playerRef.current, "player in mousedown function");
      playerRef.current &&
        activatePiece(e, playerRef.current.turn, playerRef.current.color, grid);
    };

    //when our canvas component mounts we add a listener to see what the mouse is doing so that pieces can be moved accordingly
    element.addEventListener("mousedown", doMouseDown);
    element.addEventListener("mouseup", doMouseUp);

    return () => {
      //we remove the event listeners on component dismounted making sure that listeners don't build on top of each other
      element.removeEventListener("mousedown", activatePiece);
      element.removeEventListener("mouseup", deactivatePiece);
    };
  }, [socket, playerRef.current]);

  return (
    <div className="boardWrapper">
      <div className="boardDiv" ref={canvasRef}>
        <Canvas
          width={width}
          grid={passableGrid}
          color={grid && playerRef.current.color}
        />
      </div>
    </div>
  );
}

export default Board;
