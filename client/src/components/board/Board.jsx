import React, { useEffect, useRef, useState } from "react";
import "./BoardStyles.scss";
import Canvas from "../Canvas";
import { createGrid } from "./createGrid";
import { drawSquares } from "./drawSquares";
import { drawPieces } from "../pieces/drawPieces";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { drawMovingPiece } from "../movePieces/drawMovingPiece";
import { drawCheck } from "../pieces/drawCheck";

const width = 600;

function Board() {
  //create a link to the actual DOM canvas element
  const canvasRef = useRef();
  let mousePos = {};

  const grid = createGrid(width);
  //this runs in our mousemove event listner
  const getMousePos = (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    //when our canvas component mounts we add a listener to see what the mouse is doing so that pieces can be moved accordingly
    canvasRef && canvasRef.current.addEventListener("mousedown", activatePiece);
    canvasRef && canvasRef.current.addEventListener("mousemove", getMousePos);
    canvasRef && canvasRef.current.addEventListener("mouseup", deactivatePiece);
    return () => {
      //we remove the event listeners on component dismounted making sure that listeners don't build on top of each other
      canvasRef.current.removeEventListener("mousedown", activatePiece);
      canvasRef.current.removeEventListener("mousemove", getMousePos);
      canvasRef.current.removeEventListener("mouseup", deactivatePiece);
    };
  }, []);
  //this is our main event loop for drawing all our pieces.  This is passed to the canvas component which executes it there where we can access our 2d context
  const draw = (ctx) => {
    drawSquares(ctx, grid, width);
    drawCheck(ctx, grid, width);
    drawPieces(ctx, width, "white");
    drawPieces(ctx, width, "black");
    drawMovingPiece(ctx, width, mousePos);
  };

  return (
    <div className="boardDiv" ref={canvasRef}>
      <Canvas draw={draw} height={width} width={width} />
    </div>
  );
}

export default Board;
