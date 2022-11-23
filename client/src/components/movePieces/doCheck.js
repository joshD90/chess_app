import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { getLegalMoves } from "../legalMoves/getLegalMoves";

//when a player drops his piece we want to check whether the other player's king is in check
export const doCheck = (ownColor, grid, width) => {
  const piecesToIterate = ownColor === "white" ? whitePieces : blackPieces;
  const opponentPieces = ownColor === "white" ? blackPieces : whitePieces;
  const legalMovesCumulate = [];

  const opponentKing = opponentPieces.find((piece) => piece.type === "king");

  piecesToIterate.forEach((piece) => {
    legalMovesCumulate.push(...getLegalMoves(piece, grid, width));
  });

  const kingCheck = legalMovesCumulate.some((move) => {
    return (
      move.square.an.number === opponentKing.position.num &&
      move.square.an.letter === opponentKing.position.letter
    );
  });

  return (opponentKing.inCheck = kingCheck);
};
