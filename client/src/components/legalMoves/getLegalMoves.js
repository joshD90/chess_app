import { checkNextSquare } from "./nextSquare";
import { addCastleSquares } from "./kingCastle";

export const getLegalMoves = (currentPiece, grid, width) => {
  const directions = currentPiece.movementDirection;

  const legalMoves = [];
  const legalCastle = addCastleSquares(currentPiece, legalMoves);

  legalCastle != undefined &&
    legalCastle.forEach((square) => {
      if (square) {
        legalMoves.push(square);
      }
    });

  directions.forEach((direction) => {
    checkNextSquare(
      currentPiece,
      width,
      direction,
      grid,
      legalMoves,
      currentPiece.range
    );
  });

  return legalMoves;
};
