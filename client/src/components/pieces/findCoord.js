import { createGrid } from "../board/createGrid";

const grid = createGrid(600);

export const findCoord = (position) => {
  const matchingSquare = grid.find(
    (square) =>
      square.an.letter === position.letter && square.an.number === position.num
  );

  return matchingSquare;
};
