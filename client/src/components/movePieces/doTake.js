import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
export const doTake = (newSquare, legalMoves, color) => {
  const squareLandedOn = legalMoves.find((move) => {
    console.log(move, "move in take function");
    return (
      move.square.an.letter === newSquare.an.letter &&
      move.square.an.number === newSquare.an.number
    );
  });
  console.log(squareLandedOn, "square landed on");

  if (squareLandedOn.status !== "enemy") return;
  const colorToChange = color === "white" ? blackPieces : whitePieces;

  const index = colorToChange.indexOf(
    colorToChange.find(
      (piece) =>
        piece.position.letter === newSquare.an.letter &&
        piece.position.num === newSquare.an.number
    )
  );
  colorToChange.splice(index, 1);
};
