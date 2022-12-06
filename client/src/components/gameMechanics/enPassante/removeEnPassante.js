import { removeNumber } from "../pieces/removeNumber";

export const removeEnPassante = (pieces) => {
  pieces.forEach((piece) => {
    if (removeNumber(piece.type) === "pawn") piece.enPassante = false;
  });
};
