import React, { useCallback, useEffect, useRef } from "react";
import { drawPiece } from "../pieces/drawPiece";
import { whitePiecesTaken } from "../pieces/whitePieces";
import { blackPiecesTaken } from "../pieces/blackPieces";
import { removeNumber } from "../pieces/removeNumber";

function SideCanvas({ width, color }) {
  const canvasRef = useRef();
  const canvasWidth = width / 8;
  const canvasHeight = canvasWidth * 5;
  const pieceValues = [
    { queen: 9 },
    { rook: 5 },
    { bishop: 3.1 },
    { knight: 3 },
    { pawn: 1 },
  ];

  const renderFrame = useCallback(() => {
    console.log(whitePiecesTaken);
    const ctx = canvasRef.current.getContext("2d");
    const piecesTaken = color === "black" ? blackPiecesTaken : whitePiecesTaken;
    piecesTaken.forEach((piece, index) => {
      drawPiece(ctx, width, {
        x: 0,
        y: (index * width) / 8,
        type: removeNumber(piece.type),
        color: color,
      });
    });
  }, [whitePiecesTaken]);

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
    return () => cancelAnimationFrame(tick);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "red",
        marginLeft: "40px",
        marginRight: "40px",
      }}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
}

export default SideCanvas;
