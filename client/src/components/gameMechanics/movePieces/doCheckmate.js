//if king is in check

//check all legal moves
//see whether the king is in check for all of these moves
//if there isnt a potential legal position where the king isn't in check
//return checkmate - do win / lose condition

//where to attach this check to? - probably the end of player drop?
//just after pawning but then how do i access isInCheck, he hasnt been put in check yet, maybe he has?
//the pieces object should have been updated by checks.
//then emit checkmate, will need to pass down the socket to do this

//use checked king as starting color
//getLegalMoves and for each legal move, adjustWhitePieces and BlackPieces run a checkSquaresAttacked function
//run takeInsideCheck as well to make sure that pieces have been taken
//use the checkSquaresAttacked() will be used, pass in the adjustedWhite and blackSquares

import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";
import { takeInsideCheck } from "./takeInsideCheck";
import { checkSquareAttacked } from "./doCheck";
import { getLegalMoves } from "../legalMoves/getLegalMoves";

export const doCheckmate = (socket, colorChecked, grid, width, player) => {
  let checkmate;

  let shallowWhite = JSON.parse(JSON.stringify(whitePieces));
  let shallowBlack = JSON.parse(JSON.stringify(blackPieces));
  //see whether the king is in check
  const colorInCheck = colorChecked === "white" ? shallowWhite : shallowBlack;
  const kingChecked = colorInCheck.find((piece) => (piece.type = "king"));

  const allPossiblePositions = [];

  //we check all of the legal moves for every piece belonging to the checked king
  colorInCheck.forEach((piece) => {
    const legalMoves = getLegalMoves(
      piece,
      grid,
      width,
      shallowWhite,
      shallowBlack,
      true
    );

    //if there are no legal moves to be made then this is checkmate
    if (!legalMoves || legalMoves.length === 0) {
      player.turn = false;
      checkmate = true;
      if (!kingChecked.inCheck) {
        socket.emit("stalemated", {
          pieces: { black: blackPieces, white: whitePieces },
        });
        return (checkmate = false);
      } else {
        socket.emit("checkmated", {
          colorCheckmated: colorChecked,
          pieces: { black: blackPieces, white: whitePieces },
        });
        return (checkmate = false);
      }
    }
    //if legal moves can be made then we adjust white and black pieces and check these updated positions
    //to see if the king is still in check
    legalMoves.forEach((move) => {
      //don't want to mutate the pieces that we are using in the forEach as this will ruin the next loop
      const shallowerWhite = JSON.parse(JSON.stringify(shallowWhite));
      const shallowerBlack = JSON.parse(JSON.stringify(shallowBlack));
      //adjust our own color pieces as if they had taken this hypothetical move
      const colorToSearch =
        colorChecked === "white" ? shallowerWhite : shallowerBlack;
      //find the piece associated with this potential move
      const pieceToChange = colorToSearch.find(
        (thisPiece) => thisPiece.type === piece.type
      );
      //update the position of the piece on the board
      pieceToChange.position.letter = move.square.an.letter;
      pieceToChange.position.num = move.square.an.number;
      //find and remove the old piece and add the updated piece to our array
      const index = colorToSearch.indexOf(pieceToChange);
      colorToSearch.splice(index, 1, pieceToChange);

      //we only need to update the opponents pieces if one of our moves resulted in taking his piece
      const opponentPieces =
        colorChecked === "white" ? shallowerBlack : shallowerWhite;
      takeInsideCheck(opponentPieces, pieceToChange);
      //we now find the position of the king (it may be the king himself who is changing square so we do this after adjustment)
      const kingSquare = colorToSearch.find((piece) => (piece.type = "king"));

      //now we check through the updated position to see whether the king has been attacked.

      allPossiblePositions.push(
        checkSquareAttacked(
          colorChecked,
          shallowerWhite,
          shallowerBlack,
          kingSquare,
          grid,
          width
        )
      );
    });
  });

  if (allPossiblePositions.every((elem) => elem === true)) {
    player.turn = false;
    checkmate = true;
    if (!kingChecked.inCheck) {
      socket.emit("drawn", {
        pieces: { black: blackPieces, white: whitePieces },
        method: "stalemate",
      });
    } else {
      socket.emit("checkmated", {
        colorCheckmated: colorChecked,
        pieces: { black: blackPieces, white: whitePieces },
      });
    }
  } else checkmate = false;

  return checkmate;
};
