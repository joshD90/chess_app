import { checkNextSquare } from "./nextSquare";
import { addCastleSquares } from "./kingCastle";

export const getLegalMoves = (currentPiece, grid, width) => {
  const directions = currentPiece.movementDirection;

  const legalMoves = [];
  const legalCastle = addCastleSquares(currentPiece, legalMoves);
  console.log(legalCastle, "everything that addcastlesquares returns");
  legalCastle != undefined &&
    legalCastle.forEach((square) => {
      console.log(square);
      if (square) {
        console.log(square, "shouldnt be undefined");
        legalMoves.push(square);
      }
    });
  console.log(legalMoves, "just after legal castle");

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
  console.log(legalMoves);
  return legalMoves;
};
