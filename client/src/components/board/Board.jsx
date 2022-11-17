import React from "react";
import "./BoardStyles.scss";
import Canvas from "../Canvas";
import { createGrid } from "./createGrid";
import { drawSquares } from "./drawSquares";
import { drawPiece } from "../pieces/drawPiece";
import { drawPieces } from "../pieces/drawPieces";

const width = 600;

function Board() {
  const grid = createGrid(width);

  const draw = (ctx) => {
    drawSquares(ctx, grid, width);
    drawPieces(ctx, width, "white");
    drawPieces(ctx, width, "black");
  };

  return (
    <div className="boardDiv">
      <Canvas draw={draw} height={width} width={width} />
    </div>
  );
}

export default Board;
