import { checkSquareAttacked } from "../movePieces/doCheck";
//when we land on a square that is notified as "enemy" in our legal moves array we remove this corresponding
//piece from the other colors array
export const doTake = (
  newSquare,
  legalMoves,
  pieceToChange,
  whitePieces,
  blackPieces,
  grid,
  width
) => {
  const squareLandedOn = legalMoves.find((move) => {
    return (
      move.square.an.letter === newSquare.an.letter &&
      move.square.an.number === newSquare.an.number
    );
  });
  //if the square that we have landed on is not an enemies square just exit the function
  if (squareLandedOn.status !== "enemy") return;
  //we need to know which array of pieces we need to be updating
  const colorToChange =
    pieceToChange.color === "white" ? blackPieces : whitePieces;

  //find the index of the other players piece by searching for it by matching letter and number
  const index = colorToChange.indexOf(
    colorToChange.find(
      (piece) =>
        piece.position.letter === newSquare.an.letter &&
        piece.position.num === newSquare.an.number
    )
  );

  //we need to see whether the king is will be in check before going ahead with the take
  const adjustedWhite = [...whitePieces];
  const adjustedBlack = [...blackPieces];
  console.log(pieceToChange);
  let kingPiece;
  if (pieceToChange.color === "white") {
    adjustedBlack.splice(index, 1);
    const indexOfPiece = adjustedWhite.indexOf(pieceToChange);
    adjustedWhite[indexOfPiece].position.letter = newSquare.an.letter;
    adjustedWhite[indexOfPiece].position.num = newSquare.an.number;
    kingPiece = adjustedWhite.find((piece) => (piece.type = "king"));
    console.log(adjustedWhite === whitePieces ? "the same" : "not the same");
  } else {
    adjustedWhite.splice(index, 1);
    const indexOfPiece = adjustedBlack.indexOf(pieceToChange);
    adjustedBlack[indexOfPiece].position.letter = newSquare.an.letter;
    adjustedBlack[indexOfPiece].position.num = newSquare.an.number;
    kingPiece = adjustedWhite.find((piece) => (piece.type = "king"));
  }

  if (
    checkSquareAttacked(
      pieceToChange.color,
      adjustedWhite,
      adjustedBlack,
      kingPiece,
      grid,
      width
    ) === true
  ) {
    console.log("true");
    return;
  }
  //splice to mutate the array
  colorToChange.splice(index, 1);
};
