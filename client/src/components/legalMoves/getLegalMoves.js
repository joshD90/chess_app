import { checkNextSquare } from "./nextSquare";
import { addCastleSquares } from "./kingCastle";

export const getLegalMoves = (
  currentPiece,
  grid,
  width,
  whitePieces,
  blackPieces
) => {
  const directions = currentPiece.movementDirection;

  const legalMoves = [];
  const legalCastle = addCastleSquares(currentPiece, whitePieces, blackPieces);
  //when getting our legal moves we handle the edge case of the castle first.
  //if there are any legal castling squares we add them to our legal squares
  legalCastle != undefined &&
    legalCastle.forEach((square) => {
      if (square) {
        legalMoves.push(square);
      }
    });

  //we then check all directions that our piece can move in and pass our legal moves by reference which will be updated within
  //this function

  directions.forEach((direction) => {
    checkNextSquare(
      currentPiece,
      width,
      direction,
      grid,
      legalMoves,
      currentPiece.range,
      whitePieces,
      blackPieces
    );
  });

  return legalMoves;
};
