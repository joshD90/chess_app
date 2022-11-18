import React, { useEffect, useRef, useState } from "react";
import "./BoardStyles.scss";
import Canvas from "../Canvas";
import { createGrid } from "./createGrid";
import { drawSquares } from "./drawSquares";
import { drawPieces } from "../pieces/drawPieces";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { drawMovingPiece } from "../movePieces/drawMovingPiece";

const width = 600;

function Board() {
  const canvasRef = useRef();
  let mousePos = {};

  const grid = createGrid(width);

  const getMousePos = (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    canvasRef && canvasRef.current.addEventListener("mousedown", activatePiece);
    return () =>
      canvasRef.current.removeEventListener("mousedown", activatePiece);
  }, [canvasRef]);

  useEffect(() => {
    canvasRef && canvasRef.current.addEventListener("mousemove", getMousePos);
    return () =>
      canvasRef.current.removeEventListener("mousemove", getMousePos);
  }, [canvasRef]);

  useEffect(() => {
    canvasRef && canvasRef.current.addEventListener("mouseup", deactivatePiece);
    return () =>
      canvasRef.current.removeEventListener("mouseup", deactivatePiece);
  }, [canvasRef]);

  const draw = (ctx) => {
    drawSquares(ctx, grid, width);
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
