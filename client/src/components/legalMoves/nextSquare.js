import { findCoord } from "../pieces/findCoord";
import { checkSquareOccupied } from "./checkSquareOccupied";
import {
  getKnightXDiff,
  getKnightYDiff,
  getXDiff,
  getYDiff,
} from "./getCoordDiff";
import { removeNumber } from "../pieces/removeNumber";

export const checkNextSquare = (
  selectedPiece,
  width,
  direction,
  grid,
  legalMoves,
  range
) => {
  const { coord } = findCoord(selectedPiece.position);
  if (range === 0) return;

  //if there piece is a pawn it has specific movements for first move
  if (
    removeNumber(selectedPiece.type) === "pawn" &&
    selectedPiece.firstMove === true &&
    (direction === "up" || direction === "down")
  )
    range = 2;

  //get the difference between x and y coordinates depending on the direction we wish to move in
  let xDiff;
  let yDiff;
  if (removeNumber(selectedPiece.type) === "knight") {
    xDiff = getKnightXDiff(direction, width);
    yDiff = getKnightYDiff(direction, width);
  } else {
    xDiff = getXDiff(direction, width);
    yDiff = getYDiff(direction, width);
  }
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
  //count our range down so that it will not iterate further if our piece has gone beyond its range
  range--;
  const nextSquareStatus = checkSquareOccupied(nextSquare, selectedPiece);
  if (nextSquareStatus === "own") return null;
  if (nextSquareStatus === "enemy") {
    //pawn only can attack in a directional manner
    if (
      removeNumber(selectedPiece.type) === "pawn" &&
      (direction === "up" || direction === "down")
    )
      return null;
    return legalMoves.push({ square: nextSquare, status: nextSquareStatus });
  }

  if (nextSquareStatus === "empty") {
    legalMoves.push({ square: nextSquare, status: "empty" });

    checkNextSquare(
      {
        type: selectedPiece.type,
        position: { letter: nextSquare.an.letter, num: nextSquare.an.number },
        color: selectedPiece.color,
      },
      width,
      direction,
      grid,
      legalMoves,
      range
    );
  }
};
