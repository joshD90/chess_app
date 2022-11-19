import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { drawPiece } from "../pieces/drawPiece";
import { removeNumber } from "../pieces/removeNumber";

export const drawMovingPiece = (ctx, width, position) => {
  //if the mouse is not activated as initially it may be a null value exit
  if (!position.x) return;
  //search through all our pices so that we know which one to draw
  const allPieces = [...blackPieces, ...whitePieces];
  const activatedPiece = allPieces.find((piece) => piece.activated === true);
  //if no piece has been activated we exit the function
  if (!activatedPiece) return;
  //some pieces are labelled bishop1 or bishop2 etc but our draw function just takes in the type of bishop
  //we must remove the number at the end.
  const adjustedType = removeNumber(activatedPiece.type);
  //draw our activated piece on the mouse x and y position
  drawPiece(ctx, width, {
    color: activatedPiece.color,
    x: position.x - width / 16,
    y: position.y - width / 16,
    type: adjustedType,
  });
};
