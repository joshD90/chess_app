import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { drawPiece } from "../pieces/drawPiece";

export const drawMovingPiece = (ctx, width, position) => {
  if (!position.x) return;
  const allPieces = [...blackPieces, ...whitePieces];
  const activatedPiece = allPieces.find((piece) => {
    const type = Object.keys(piece)[0];
    return piece[type].activated === true;
  });
  if (!activatedPiece) return;
  let adjustedType = Object.keys(activatedPiece)[0];
  adjustedType = adjustedType.split("1")[0];
  adjustedType = adjustedType.split("2")[0];
  drawPiece(ctx, width, {
    color: "white",
    x: position.x - width / 16,
    y: position.y - width / 16,
    type: adjustedType,
  });
};
