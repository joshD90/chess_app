import { whitePieces } from "./whitePieces";
import { blackPieces } from "./blackPieces";
import { drawPiece } from "./drawPiece";
import { findCoord } from "./findCoord";
import { removeNumber } from "./removeNumber";

export function drawPieces(ctx, width, color) {
  let pieces = [];
  color === "white" ? (pieces = whitePieces) : (pieces = blackPieces);
  //we run through both arrays and draw each piece
  pieces.forEach((piece) => {
    //if the piece has been clicked and dragged then we leave this out of our normal draw function
    //and let drawMovingPiece function handle drwawing this to the mouse pointer
    if (piece.activated) return;
    //this converts our piece notation into the grids x and y position to draw on the board
    const square = findCoord(piece.position);
    let basicType = removeNumber(piece.type);

    const properties = {
      type: basicType,
      x: square.coord.x - width / 16,
      y: square.coord.y - width / 16,
      color: color,
    };

    drawPiece(ctx, width, properties);
  });
}
