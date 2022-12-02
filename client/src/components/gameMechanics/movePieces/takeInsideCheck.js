export const takeInsideCheck = (piecesToChange, movingPiece) => {
  const index = piecesToChange.indexOf(
    piecesToChange.find((piece) => {
      return (
        piece.position.letter === movingPiece.position.letter &&
        piece.position.num === movingPiece.position.num
      );
    })
  );

  if (index === -1) return;

  piecesToChange.splice(index, 1);
};
