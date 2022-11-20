import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";

export const checkSquareOccupied = (nextSquare, startPiece) => {
  if (
    whitePieces.some(
      (piece) =>
        piece.position.num === nextSquare.an.number &&
        piece.position.letter === nextSquare.an.letter
    )
  ) {
    if (startPiece.color === "white") {
      return null;
    } else return "enemy";
  }
  if (
    blackPieces.some(
      (piece) =>
        piece.position.num === nextSquare.an.number &&
        piece.position.letter === nextSquare.an.letter
    )
  ) {
    if (startPiece.color === "black") {
      return null;
    } else return "enemy";
  }
  return "empty";
};
