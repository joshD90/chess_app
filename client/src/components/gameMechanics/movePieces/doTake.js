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
  width,
  whitePiecesTaken,
  blackPiecesTaken
) => {
  const squareLandedOn = legalMoves.find((move) => {
    return (
      move.square.an.letter === newSquare.an.letter &&
      move.square.an.number === newSquare.an.number
    );
  });
  //if the square that we have landed on is not an enemies square just exit the function
  if (
    !(
      squareLandedOn.status === "enemy" ||
      squareLandedOn.status === "enPassante"
    )
  )
    return;

  console.log("WE HAVE REACHED THIS FAR");
  //we need to know which array of pieces we need to be updating
  const colorToChange =
    pieceToChange.color === "white" ? blackPieces : whitePieces;
  const adjuster = pieceToChange.color === "white" ? 1 : -1;
  let index;
  //find the index of the other players piece by searching for it by matching letter and number
  if (squareLandedOn.status === "enemy")
    index = colorToChange.indexOf(
      colorToChange.find(
        (piece) =>
          piece.position.letter === newSquare.an.letter &&
          piece.position.num === newSquare.an.number
      )
    );
  if (squareLandedOn.status === "enPassante")
    index = colorToChange.indexOf(
      colorToChange.find(
        (piece) =>
          piece.position.letter === newSquare.an.letter &&
          piece.position.num + adjuster === newSquare.an.number
      )
    );

  //we need to see whether the king is will be in check before going ahead with the take
  const adjustedWhite = [...whitePieces];
  const adjustedBlack = [...blackPieces];

  let kingPiece;
  if (pieceToChange.color === "white") {
    adjustedBlack.splice(index, 1);
    const indexOfPiece = adjustedWhite.indexOf(pieceToChange);
    adjustedWhite[indexOfPiece].position.letter = newSquare.an.letter;
    adjustedWhite[indexOfPiece].position.num = newSquare.an.number;
    kingPiece = adjustedWhite.find((piece) => (piece.type = "king"));
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
    return;
  }
  //add this taken piece to our respective taken pieces array
  colorToChange === blackPieces
    ? blackPiecesTaken.push(colorToChange[index])
    : whitePiecesTaken.push(colorToChange[index]);
  //splice to mutate the array
  colorToChange.splice(index, 1);
};
