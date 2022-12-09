import React, { useCallback, useEffect, useRef } from "react";
import { drawPiece } from "../pieces/drawPiece";
import { whitePiecesTaken } from "../pieces/whitePieces";
import { blackPiecesTaken } from "../pieces/blackPieces";
import { removeNumber } from "../pieces/removeNumber";

function SideCanvas({ width, color }) {
  const canvasRef = useRef();
  const canvasWidth = width / 8;
  const canvasHeight = canvasWidth * 5;

  const renderFrame = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    const piecesTaken = color === "black" ? blackPiecesTaken : whitePiecesTaken;

    const adjusted = adjustedTaken(piecesTaken);
    ctx.fillStyle = "#eef5f8";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    adjusted.forEach((piece, index) => {
      drawPiece(ctx, width, {
        x: 0,
        y: (index * width) / 8,
        type: removeNumber(piece.type),
        color: color,
      });
      ctx.fillStyle = "black";
      ctx.font = `bold ${width / 30}px sans-serif`;
      piece.quantity > 1 &&
        ctx.fillText(
          `X ${piece.quantity}`,
          width / 8 - width / 20,
          ((index + 1) * width) / 8 + 5
        );
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
        marginLeft: "40px",
        marginRight: "40px",
      }}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight + 40} />
    </div>
  );
}

const adjustedTaken = (taken) => {
  const pieceValues = { queen: 9, rook: 5, bishop: 3.1, knight: 3, pawn: 1 };
  const removedDuplicates = [];
  for (const piece of taken) {
    const sameType = removedDuplicates.find(
      (newPiece) => removeNumber(newPiece.type) === removeNumber(piece.type)
    );
    if (sameType) {
      sameType.quantity++;
    } else {
      removedDuplicates.push({
        ...piece,
        type: removeNumber(piece.type),
        quantity: 1,
      });
    }
  }
  const valueAdded = removedDuplicates.map((piece) => {
    return { ...piece, value: pieceValues[removeNumber(piece.type)] };
  });
  const compare = (a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
  };
  const adjusted = valueAdded.sort(compare);
  return adjusted;
};
export default SideCanvas;
