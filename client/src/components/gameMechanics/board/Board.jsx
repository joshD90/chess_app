import React, { useEffect, useRef, useContext, useState } from "react";
import "./BoardStyles.scss";
import Canvas from "../../Canvas";
import { createGrid } from "./createGrid";
import { drawSquares } from "./drawSquares";
import { drawPieces } from "../pieces/drawPieces";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { drawMovingPiece } from "../movePieces/drawMovingPiece";
import { drawCheck } from "../pieces/drawCheck";
import { SocketContext } from "../../../context/SocketContext";
import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";
import { PlayerContext } from "../../../context/PlayerContext";

const width = 600;

function Board() {
  const socket = useContext(SocketContext);

  const { player, setPlayer } = useContext(PlayerContext);
  const playerRef = React.createRef();
  let grid;
  useEffect(() => {
    socket.on("connect", () => {
      playerRef.current = { turn: false, color: "" };
    });
    socket.on("color-set", (colorObj) => {
      if (socket.id === colorObj.white) {
        playerRef.current.turn = true;
        playerRef.current.color = "white";
        grid = createGrid(width, "white");
      }
      if (socket.id === colorObj.black) {
        playerRef.current.turn = false;
        playerRef.current.color = "black";
        grid = createGrid(width, "black");
      }
    });
    socket.on("update-pieces", (pieces) => {
      playerRef.current.turn = true;
      whitePieces.splice(0, whitePieces.length, ...pieces.white);
      blackPieces.splice(0, blackPieces.length, ...pieces.black);
    });
    return () => {
      socket.off("connect");
      socket.off("update-pieces");
      socket.off("color-set");
    };
  }, []);

  //create a link to the actual DOM canvas element
  const canvasRef = useRef();
  const mousePosRef = React.createRef();

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

  //this is our main event loop for drawing all our pieces.  This is passed to the canvas component which executes it there where we can access our 2d context
  const draw = (ctx, position) => {
    if (!grid) return;
    drawSquares(ctx, grid, width, playerRef.current.color);
    drawCheck(ctx, grid, width);
    drawPieces(ctx, width, "white", grid);
    drawPieces(ctx, width, "black", grid);
    drawMovingPiece(ctx, width, position);
  };

  return (
    <div className="boardDiv" ref={canvasRef}>
      <Canvas draw={draw} height={width} width={width} />
    </div>
  );
}

export default Board;
