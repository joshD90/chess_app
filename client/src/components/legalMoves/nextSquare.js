import { findCoord } from "../pieces/findCoord";
import { checkSquareOccupied } from "./checkSquareOccupied";

export const checkNextSquare = (
  selectedPiece,
  width,
  direction,
  grid,
  legalMoves
) => {
  const { coord } = findCoord(selectedPiece.position);

  let xDiff;
  let yDiff;
  //see what change we need to make to the x axis
  if (direction === "up" || direction === "down") xDiff = 0;
  if (direction === "left") xDiff = -width / 8;
  if (direction === "right") xDiff = width / 8;

  if (direction === "diagLeftUp" || direction === "diagLeftDown")
    xDiff = -width / 8;
  if (direction === "diagRightUp" || direction === "diagRightDown")
    xDiff = width / 8;

  //see what change we need to add to the y axis
  if (direction === "left" || direction === "right") yDiff = 0;
  if (direction === "up") yDiff = -width / 8;
  if (direction === "down") yDiff = width / 8;
  if (direction === "diagLeftUp" || direction === "diagRightUp")
    yDiff = -width / 8;
  if (direction === "diagLeftDown" || direction === "diagRightDown")
    yDiff = width / 8;
  //x and y coords of the next square in the direction
  const nextSquarePos = { x: coord.x + xDiff, y: coord.y + yDiff };
  //see which square in the grid matches with the new square coords
  const nextSquare = grid.find((square) => {
    return (
      square.coord.x === nextSquarePos.x && square.coord.y === nextSquarePos.y
    );
  });
  //if the square is not on the board
  if (!nextSquare) return console.log("this square is not part of the grid");

  const nextSquareStatus = checkSquareOccupied(nextSquare, selectedPiece);
  if (nextSquareStatus === "own") return null;
  if (nextSquareStatus === "enemy")
    return legalMoves.push({ square: nextSquare, status: nextSquareStatus });
  if (nextSquareStatus === "empty") {
    legalMoves.push({ square: nextSquare, status: "empty" });

    checkNextSquare(
      {
        position: { letter: nextSquare.an.letter, num: nextSquare.an.number },
        color: selectedPiece.color,
      },
      width,
      direction,
      grid,
      legalMoves
    );
  }
};
