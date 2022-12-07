import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { getLegalMoves } from "../legalMoves/getLegalMoves";
import { takeInsideCheck } from "./takeInsideCheck";

//when a player drops his piece we want to check whether the other player's king is in check
export const doCheck = (colorOfKing, grid, width, pieceChanged) => {
  //grab a shallow copy of our pieces so that we can adjust them without mutating our actual pieces
  let adjustedWhite = JSON.parse(JSON.stringify(whitePieces));
  let adjustedBlack = JSON.parse(JSON.stringify(blackPieces));
  let kingSquare;

  //we adjust the shallow copy of our pieces to include the updated piece position
  if (pieceChanged.color === "white") {
    const index = adjustedWhite.indexOf(
      adjustedWhite.find((piece) => piece.type === pieceChanged.type)
    );
    //we remove the piece's previous entry and sub in its new position
    adjustedWhite.splice(index, 1);
    adjustedWhite.push(pieceChanged);

    //we check to see whether there are pieces we need to remove from the black pieces if that piece has been taken
    takeInsideCheck(adjustedBlack, pieceChanged);
  }
  //do this for the black pieces as well
  if (pieceChanged.color === "black") {
    const index = adjustedBlack.indexOf(
      adjustedBlack.find((piece) => piece.type === pieceChanged.type)
    );
    adjustedBlack.splice(index, 1);
    adjustedBlack.push(pieceChanged);
    takeInsideCheck(adjustedWhite, pieceChanged);
  }

  //we find the square where the white or black king is so we can check if they are in the firing line of any other pieces

  kingSquare =
    colorOfKing === "black"
      ? adjustedBlack.find((piece) => piece.type === "king")
      : adjustedWhite.find((piece) => piece.type === "king");

  if (
    checkSquareAttacked(
      colorOfKing,
      adjustedWhite,
      adjustedBlack,
      kingSquare,
      grid,
      width,
      pieceChanged.color
    ) === true
  ) {
    return true;
  } else return false;
};

//if a player finishes their move then we want to check to see whether
//-the updated position will put their own king in check
//-will put the other players king in check

//if a player wants to castle then we want to update the king position for every square he passes through

export const checkSquareAttacked = (
  defendingColor,
  adjustedWhitePieces,
  adjustedBlackPieces,
  squareToCheck,
  grid,
  width,
  pieceChangedColor
) => {
  //we want to accumulate all legal moves of all pieces belonging to the opposing side and push them into this array
  const legalMovesCumulate = [];

  const opposingPieces =
    defendingColor === "white" ? adjustedBlackPieces : adjustedWhitePieces;
  //gather all the legal moves
  opposingPieces.forEach((piece) => {
    return legalMovesCumulate.push(
      ...getLegalMoves(
        piece,
        grid,
        width,
        adjustedWhitePieces,
        adjustedBlackPieces,
        pieceChangedColor === defendingColor ? true : false
      )
    );
  });

  //we then check is the king square // or any other square a part of this
  const kingCheck = legalMovesCumulate.some((move) => {
    return (
      move.square.an.number === squareToCheck.position.num &&
      move.square.an.letter === squareToCheck.position.letter
    );
  });

  //if we return true then the king is in check
  return kingCheck;
};
