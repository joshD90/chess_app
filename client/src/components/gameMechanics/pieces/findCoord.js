import { createGrid } from "../board/createGrid";

//this function converts the algebraic notation of a pieces position into an x / y coordinate

export const findCoord = (position, grid) => {
  const matchingSquare = grid.find(
    (square) =>
      square.an.letter === position.letter && square.an.number === position.num
  );

  return matchingSquare;
};
