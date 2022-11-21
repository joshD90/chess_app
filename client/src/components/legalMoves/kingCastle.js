import { removeNumber } from "../pieces/removeNumber";
import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { checkSquareOccupied } from "./checkSquareOccupied";
import { findCoord } from "../pieces/findCoord";

export const addCastleSquares = (selectedPiece, legalMoves, grid, width) => {
  if (selectedPiece.type !== "king") return;
  if (!selectedPiece.firstMove) return;
  const colorToCheck =
    selectedPiece.color === "white" ? whitePieces : blackPieces;

  const legalCastleLeft = checkLeft(colorToCheck, selectedPiece);
  const legalCastleRight = checkRight(colorToCheck, selectedPiece);
  return [legalCastleLeft, legalCastleRight];
};

const checkLeft = (colorToCheck, selectedPiece) => {
  const leftRook = findRook("a", colorToCheck);
  if (leftRook.firstMove === false) return null;
  const number = selectedPiece.position.num;

  const inBetweenSquares = [
    { number: number, letter: "d" },
    { number: number, letter: "c" },
    { number: number, letter: "b" },
  ];
  const inBetweenStatus = inBetweenSquares.map((square) => {
    const status = checkSquareOccupied({ an: square }, selectedPiece);
    return status;
  });
  if (!inBetweenStatus.every((elem) => elem === "empty")) return null;
  const castleSquare = findCoord({ letter: "c", num: number });
  console.log(castleSquare, "the legal square to castle to");
  return { square: castleSquare, status: "castle" };
};

const checkRight = (colorToCheck, selectedPiece) => {
  const rightRook = findRook("h", colorToCheck);
  if (rightRook.firstMove === false) return null;
  const number = selectedPiece.position.num;

  const inBetweenSquares = [
    { number: number, letter: "g" },
    { number: number, letter: "f" },
  ];
  const inBetweenStatus = inBetweenSquares.map((square) => {
    const status = checkSquareOccupied({ an: square }, selectedPiece);
    return status;
  });
  if (!inBetweenStatus.every((elem) => elem === "empty")) return null;
  const castleSquare = findCoord({ letter: "g", num: number });
  console.log(castleSquare, "the legal square to castle to");
  return { square: castleSquare, status: "castle" };
};

const findRook = (letter, colorPieces) => {
  const rook = colorPieces.find(
    (piece) =>
      removeNumber(piece.type) === "rook" && piece.position.letter === letter
  );
  return rook;
};
