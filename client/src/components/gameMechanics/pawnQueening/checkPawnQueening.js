import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";
import { removeNumber } from "../pieces/removeNumber";

export const checkPawnQueening = (color) => {
  const colorToCheck = color === "white" ? whitePieces : blackPieces;

  const pawnQueening = colorToCheck.find((piece) => {
    const type = removeNumber(piece.type);
    const queeningRow = color === "white" ? 8 : 1;
    return type === "pawn" && piece.position.num === queeningRow;
  });

  return pawnQueening;
};
