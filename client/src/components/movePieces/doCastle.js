import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";

export const doCastle = (newSquare, legalMoves, color) => {
  //we wish to check to see whether the king has moved to a castling square
  const squareLandedOn = legalMoves.find((square) => {
    return (
      square.square.an.letter === newSquare.an.letter &&
      square.square.an.number === newSquare.an.number
    );
  });
  //dont carry on any further unless the status of the square is castle
  if (squareLandedOn.status != "castle") return;

  if (color === "white") {
    if (newSquare.an.letter === "g") {
      //find index of rook and then update the indices
      const indexOfRook = whitePieces.indexOf(
        whitePieces.find(
          (piece) => piece.position.letter === "h" && piece.position.num === 1
        )
      );
      whitePieces[indexOfRook].position.letter = "f";
    }
    if (newSquare.an.letter === "c") {
      const indexOfRook = whitePieces.indexOf(
        whitePieces.find(
          (piece) => piece.position.letter === "a" && piece.position.num === 1
        )
      );
      whitePieces[indexOfRook].position.letter = "d";
    }
  }
  if (color === "black") {
    if (newSquare.an.letter === "g") {
      //find index of rook and then update the indices
      const indexOfRook = blackPieces.indexOf(
        blackPieces.find(
          (piece) => piece.position.letter === "h" && piece.position.num === 8
        )
      );
      blackPieces[indexOfRook].position.letter = "f";
    }
    if (newSquare.an.letter === "c") {
      const indexOfRook = blackPieces.indexOf(
        blackPieces.find(
          (piece) => piece.position.letter === "a" && piece.position.num === 8
        )
      );
      blackPieces[indexOfRook].position.letter = "d";
    }
  }
};
