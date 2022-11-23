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

  const colorToChange = color === "white" ? whitePieces : blackPieces;
  const row = color === "white" ? 1 : 8;
  if (newSquare.an.letter === "g") {
    //find index of rook and then update the element at that index
    const indexOfRook = colorToChange.indexOf(
      colorToChange.find(
        (piece) => piece.position.letter === "h" && piece.position.num === row
      )
    );
    colorToChange[indexOfRook].position.letter = "f";
  }
  //if the square that the king is landing on is a "c" then we change the rook on the a row
  if (newSquare.an.letter === "c") {
    const indexOfRook = colorToChange.indexOf(
      colorToChange.find(
        (piece) => piece.position.letter === "a" && piece.position.num === row
      )
    );
    colorToChange[indexOfRook].position.letter = "d";
  }
};
