//when we land on a square that is notified as "enemy" in our legal moves array we remove this corresponding
//piece from the other colors array
export const doTake = (
  newSquare,
  legalMoves,
  color,
  whitePieces,
  blackPieces
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
  const colorToChange = color === "white" ? blackPieces : whitePieces;
  //find the index of the other players piece by searching for it by matching letter and number
  const index = colorToChange.indexOf(
    colorToChange.find(
      (piece) =>
        piece.position.letter === newSquare.an.letter &&
        piece.position.num === newSquare.an.number
    )
  );
  //splice to mutate the array
  colorToChange.splice(index, 1);
};
