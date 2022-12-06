import { removeNumber } from "../pieces/removeNumber";

export const checkSquareOccupied = (
  nextSquare,
  startPiece,
  whitePieces,
  blackPieces
) => {
  //if our next square is one behind an opponent pawn that is in 'en passante' we can add this to legal moves
  //as enpassante
  if (
    whitePieces.some(
      (piece) =>
        piece.position.num - 1 === nextSquare.an.number &&
        piece.position.letter === nextSquare.an.letter &&
        removeNumber(piece.type) === "pawn" &&
        piece.enPassante === true
    )
  ) {
    if (startPiece.color === "black") {
      console.log("EN PASSANT for black");
      return "enPassante";
    }
  }

  if (
    blackPieces.some(
      (piece) =>
        piece.position.num + 1 === nextSquare.an.number &&
        piece.position.letter === nextSquare.an.letter &&
        removeNumber(piece.type) === "pawn" &&
        piece.enPassante === true
    )
  ) {
    if (startPiece.color === "white") {
      console.log("en passante for white pieces");
      return "enPassante";
    }
  }
  //we run through all the white pieces and see whether they are standing on the square that
  //we are checking is a legal move.  If they are and we are white then its an illegal move.
  //if they are and we are black then its an enemy square
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
  //return empty as default
  return "empty";
};
