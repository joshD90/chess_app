import { removeNumber } from "../pieces/removeNumber";
export const activateEnPassante = (piece, newSquare) => {
  if (removeNumber(piece.type) !== "pawn") return;
  if (!piece.firstMove) return;
  const enPassanteRow = piece.color === "white" ? 4 : 5;
  if (newSquare.an.number !== enPassanteRow) return;
  piece.enPassante = true;
};
