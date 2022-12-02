import { drawPiece } from "../pieces/drawPiece";
import { checkPawnQueening } from "./checkPawnQueening";

export const drawPawnOptions = (ctx, color, width) => {
  const pawnOptions = [
    { type: "queen" },
    { type: "rook" },
    { type: "bishop" },
    { type: "knight" },
  ];

  const pawnQueening = checkPawnQueening(color);
  if (!pawnQueening) return;

  const squareWidth = width / 6;
  const boxXStart = width / 2 - squareWidth / 2;
  const boxYStart = width / 2 - squareWidth * 2;
  ctx.beginPath();
  ctx.fillStyle = "beige";
  ctx.fillRect(boxXStart, boxYStart, squareWidth, squareWidth * 4);

  pawnOptions.forEach((option, index) =>
    drawPiece(ctx, squareWidth * 8, {
      type: option.type,
      color: color,
      x: boxXStart,
      y: boxYStart + squareWidth * index,
    })
  );
};
