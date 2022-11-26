import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { doCheck } from "../movePieces/doCheck";

export const doCastle = (newSquare, legalMoves, color, grid, width) => {
  //we wish to check to see whether the king has moved to a castling square
  const squareLandedOn = legalMoves.find((square) => {
    return (
      square.square.an.letter === newSquare.an.letter &&
      square.square.an.number === newSquare.an.number
    );
  });
  //dont carry on any further unless the status of the square is castle
  if (squareLandedOn.status !== "castle") return;

  const colorToChange = color === "white" ? whitePieces : blackPieces;
  const row = color === "white" ? 1 : 8;
  if (newSquare.an.letter === "g") {
    if (
      checkInBetweenSquares(color, row, ["e", "f", "g"], grid, width) === true
    )
      return null;

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
    if (
      checkInBetweenSquares(color, row, ["c", "d", "e"], grid, width) === true
    )
      return null;

    const indexOfRook = colorToChange.indexOf(
      colorToChange.find(
        (piece) => piece.position.letter === "a" && piece.position.num === row
      )
    );
    colorToChange[indexOfRook].position.letter = "d";
  }
};

const checkInBetweenSquares = (color, row, letters, grid, width) => {
  //need to make sure we dont mutate the original array when we do checks
  const shallowWhitePieces = [...whitePieces];
  const shallowBlackPieces = [...blackPieces];

  const changedKing =
    color === "white"
      ? shallowWhitePieces.find((piece) => piece.type === "king")
      : shallowBlackPieces.find((piece) => piece.type === "king");

  const adjustedChangedKing = {
    ...changedKing,
    position: { letter: "e", num: row },
  };

  const cumulativeCheck = [];
  letters.forEach((letter) => {
    adjustedChangedKing.position.letter = letter;

    const checkResult = doCheck(color, grid, width, adjustedChangedKing);

    cumulativeCheck.push(doCheck(color, grid, width, adjustedChangedKing));
  });

  if (cumulativeCheck.some((elem) => elem === true)) return true;
  return false;
};
