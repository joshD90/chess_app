import { whitePieces } from "./whitePieces";
import { blackPieces } from "./blackPieces";
import { drawPiece } from "./drawPiece";
import { findCoord } from "./findCoord";

export function drawPieces(ctx, width, color) {
  let pieces = [];
  color === "white" ? (pieces = whitePieces) : (pieces = blackPieces);
  pieces.forEach((piece) => {
    const type = Object.keys(piece)[0];
    const square = findCoord(piece[type].position);
    let basicType = type.split(1)[0];
    basicType = basicType.split(2)[0];
    console.log(basicType);
    const properties = {
      type: basicType,
      x: square.coord.x - width / 16,
      y: square.coord.y - width / 16,
      color: color,
    };

    drawPiece(ctx, width, properties);
  });
}
