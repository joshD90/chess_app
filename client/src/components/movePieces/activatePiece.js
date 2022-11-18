import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { createGrid } from "../board/createGrid";
import { checkBoundary } from "./checkBoundary";
import { drawPieces } from "../pieces/drawPieces";

export const activatePiece = (e) => {
  const position = { x: e.clientX, y: e.clientY };
  const grid = createGrid(600);
  const width = 600;

  const selectedSquare = checkBoundary(position, grid, width);

  const selectedPiece = whitePieces.find((piece) => {
    const type = Object.keys(piece)[0];

    return (
      piece[type].position.num === selectedSquare.an.number &&
      piece[type].position.letter === selectedSquare.an.letter
    );
  });
  if (!selectedPiece) return;
  const indexOfPiece = whitePieces.indexOf(selectedPiece);
  whitePieces[indexOfPiece][Object.keys(selectedPiece)[0]].activated = true;
};

export const deactivatePiece = (e) => {
  const position = { x: e.clientX, y: e.clientY };
  const grid = createGrid(600);
  const width = 600;

  const allPieces = [...whitePieces, ...blackPieces];
  console.log(allPieces);
  const pieceToChange = allPieces.find((piece) => {
    const type = Object.keys(piece)[0];
    const { activated } = piece[type];
    return activated === true;
  });
  const index = whitePieces.indexOf(pieceToChange);

  const newSquare = checkBoundary(position, grid, width);
  console.log(newSquare);
  whitePieces[index][Object.keys(pieceToChange)[0]].position.letter =
    newSquare.an.letter;
  whitePieces[index][Object.keys(pieceToChange)[0]].position.num =
    newSquare.an.number;
  whitePieces[index][Object.keys(pieceToChange)[0]].activated = false;
};
