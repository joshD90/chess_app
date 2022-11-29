import { removeNumber } from "../pieces/removeNumber";
import { checkSquareOccupied } from "./checkSquareOccupied";
import { findCoord } from "../pieces/findCoord";

export const addCastleSquares = (
  selectedPiece,
  shallowWhitePieces,
  shallowBlackPieces,
  grid
) => {
  if (selectedPiece.type !== "king") return;
  if (!selectedPiece.firstMove) return;

  const colorToCheck =
    selectedPiece.color === "white" ? shallowWhitePieces : shallowBlackPieces;

  const legalCastleLeft = checkLeft(
    colorToCheck,
    selectedPiece,
    shallowWhitePieces,
    shallowBlackPieces,
    grid
  );
  const legalCastleRight = checkRight(
    colorToCheck,
    selectedPiece,
    shallowWhitePieces,
    shallowBlackPieces,
    grid
  );

  return [legalCastleLeft, legalCastleRight];
};

const checkLeft = (
  colorToCheck,
  selectedPiece,
  shallowWhitePieces,
  shallowBlackPieces,
  grid
) => {
  const leftRook = findRook("a", colorToCheck);
  if (!leftRook) return null;
  if (leftRook.firstMove === false) return null;
  const number = selectedPiece.position.num;

  const inBetweenSquares = [
    { number: number, letter: "d" },
    { number: number, letter: "c" },
    { number: number, letter: "b" },
  ];
  const inBetweenStatus = inBetweenSquares.map((square) => {
    const status = checkSquareOccupied(
      { an: square },
      selectedPiece,
      shallowWhitePieces,
      shallowBlackPieces
    );
    return status;
  });
  if (!inBetweenStatus.every((elem) => elem === "empty")) return null;
  const castleSquare = findCoord({ letter: "c", num: number }, grid);

  return { square: castleSquare, status: "castle" };
};

const checkRight = (
  colorToCheck,
  selectedPiece,
  shallowWhitePieces,
  shallowBlackPieces,
  grid
) => {
  const rightRook = findRook("h", colorToCheck);
  if (!rightRook) return null;
  if (rightRook.firstMove === false) return null;
  const number = selectedPiece.position.num;

  const inBetweenSquares = [
    { number: number, letter: "g" },
    { number: number, letter: "f" },
  ];
  const inBetweenStatus = inBetweenSquares.map((square) => {
    const status = checkSquareOccupied(
      { an: square },
      selectedPiece,
      shallowWhitePieces,
      shallowBlackPieces
    );
    return status;
  });
  if (!inBetweenStatus.every((elem) => elem === "empty")) return null;
  const castleSquare = findCoord({ letter: "g", num: number }, grid);
  return { square: castleSquare, status: "castle" };
};

const findRook = (letter, colorPieces) => {
  const rook = colorPieces.find(
    (piece) =>
      removeNumber(piece.type) === "rook" && piece.position.letter === letter
  );

  return rook;
};
