import { whitePieces } from "./whitePieces";
import { blackPieces } from "./blackPieces";
import { findCoord } from "./findCoord";

export const drawCheck = (ctx, grid, width) => {
  const allPieces = [...whitePieces, ...blackPieces];
  const kingsInCheck = allPieces.filter((piece) => piece.inCheck === true);
  if (kingsInCheck === []) return;
  kingsInCheck.forEach((king) => {
    const kingCoords = findCoord(king.position);
    console.log(kingCoords);
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(
      kingCoords.coord.x - width / 16,
      kingCoords.coord.y - width / 16,
      width / 8,
      width / 8
    );
  });
};
