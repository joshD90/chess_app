import { checkNextSquare } from "./nextSquare";

export const getLegalMoves = (currentPiece, grid, width) => {
  const directions = currentPiece.movementDirection;

  const legalMoves = [];
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
