import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { createGrid } from "../board/createGrid";
import { checkBoundary } from "./checkBoundary";
import { getLegalMoves } from "../legalMoves/getLegalMoves";
import { doCastle } from "./doCastle";
import { doTake } from "./doTake";
import { doCheck } from "./doCheck";

export let legalMoves = [];

//if the user clicks on a piece we set it to activate so that we know whether to draw it on the mouse point or not
export const activatePiece = (e) => {
  const position = { x: e.clientX, y: e.clientY };
  const grid = createGrid(600);
  const width = 600;
  //check all pieces, once we add in user controls we will just be checking either white or black pieces
  const allPieces = [...blackPieces, ...whitePieces];
  //see what square we have clicked on
  const selectedSquare = checkBoundary(position, grid, width);
  //this is the piece that corresponds to that clicked square.
  const selectedPiece = allPieces.find((piece) => {
    return (
      piece.position.num === selectedSquare.an.number &&
      piece.position.letter === selectedSquare.an.letter
    );
  });
  //if there was no piece on that square we exit the function as nothing needs to be done.
  if (!selectedPiece) return;

  // //we check the next square in the direction around this piece
  const shallowWhitePieces = [...whitePieces];
  const shallowBlackPieces = [...blackPieces];
  legalMoves = getLegalMoves(
    selectedPiece,
    grid,
    width,
    shallowWhitePieces,
    shallowBlackPieces
  );

  //we find the index of the piece so that when we change it we are not just changing the shallow copy of the array
  if (selectedPiece.color === "white") {
    const indexOfPiece = whitePieces.indexOf(selectedPiece);
    whitePieces[indexOfPiece].activated = true;
  } else {
    const indexOfPiece = blackPieces.indexOf(selectedPiece);
    blackPieces[indexOfPiece].activated = true;
  }
};

//when we lift the mouse button we wish to drop the piece
export const deactivatePiece = (e, socket) => {
  const position = { x: e.clientX, y: e.clientY };
  const grid = createGrid(600);
  const width = 600;
  //check all pieces this will be changed once player turns are implemented
  const allPieces = [...whitePieces, ...blackPieces];
  //we find the element that has the activated property
  const pieceToChange = allPieces.find((piece) => piece.activated === true);

  if (!pieceToChange) return;
  //we find the index and pass this to our original variable so we are not just changed the shallow copy
  const index =
    pieceToChange.color === "white"
      ? whitePieces.indexOf(pieceToChange)
      : blackPieces.indexOf(pieceToChange);
  //we see where the mouse pointer is currently so we know which square to change the piece's coordinates to
  const newSquare = checkBoundary(position, grid, width);

  //when we try to drop the piece we want to see whether the new square is contained in the legal moves array
  if (
    !legalMoves.some((move) => {
      return (
        move.square.an.letter === newSquare.an.letter &&
        move.square.an.number === newSquare.an.number
      );
    })
  ) {
    //keep the same position but deactivate
    return pieceToChange.color === "white"
      ? (whitePieces[index].activated = false)
      : (blackPieces[index].activated = false);
  }

  //this holds the castling move logic
  if (
    doCastle(newSquare, legalMoves, pieceToChange.color, grid, width) === null
  ) {
    return pieceToChange.color === "white"
      ? (whitePieces[index].activated = false)
      : (blackPieces[index].activated = false);
  }

  //we want to see if a piece is in check any time either a white or black piece is moved
  //we get the proposed position of the piece and plug this into our pieces and then check whether this returns a check
  //or not before approving the move
  const changedPiece = {
    ...pieceToChange,
    position: {
      num: newSquare.an.number,
      letter: newSquare.an.letter,
    },
  };
  //if changing our pieces would give our king a check, we don't carry out the move and return it to its original square
  if (doCheck(pieceToChange.color, grid, width, changedPiece) === true) {
    return pieceToChange.color === "white"
      ? (whitePieces[index].activated = false)
      : (blackPieces[index].activated = false);
  } else {
    //if the move we have done gets us out of check or does not lead us into check then we turn off the check
    pieceToChange.color === "white"
      ? (whitePieces.find((piece) => piece.type === "king").inCheck = false)
      : (blackPieces.find((piece) => piece.type === "king").inCheck = false);
  }

  //if the proposed move would lead to the other king being in check then we change the state
  if (
    doCheck(
      pieceToChange.color === "white" ? "black" : "white",
      grid,
      width,
      changedPiece
    ) === true
  ) {
    pieceToChange.color === "white"
      ? (blackPieces.find((piece) => piece.type === "king").inCheck = true)
      : (whitePieces.find((piece) => piece.type === "king").inCheck = true);
  } else {
    pieceToChange.color === "white"
      ? (blackPieces.find((piece) => piece.type === "king").inCheck = false)
      : (whitePieces.find((piece) => piece.type === "king").inCheck = false);
  }

  //this will check whether the piece is moving onto an enemy piece and remove that piece if its on the landing square
  doTake(
    newSquare,
    legalMoves,
    pieceToChange,
    whitePieces,
    blackPieces,
    grid,
    width
  );

  if (pieceToChange.color === "white") {
    whitePieces[index].position.letter = newSquare.an.letter;
    whitePieces[index].position.num = newSquare.an.number;
    whitePieces[index].activated = false;
    whitePieces[index].firstMove = false;
  } else {
    blackPieces[index].position.letter = newSquare.an.letter;
    blackPieces[index].position.num = newSquare.an.number;
    blackPieces[index].activated = false;
    blackPieces[index].firstMove = false;
  }
  socket.emit("send-message", { white: whitePieces, black: blackPieces });
};
