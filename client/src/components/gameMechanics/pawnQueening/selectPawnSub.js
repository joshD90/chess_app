import { checkPawnQueening } from "./checkPawnQueening";
import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";
import { checkSquareAttacked } from "../movePieces/doCheck";

export const selectPawnSub = (
  e,
  position,
  socket,
  player,
  width,
  whitePiecesTaken,
  blackPiecesTaken,
  grid
) => {
  const pawnOptions = [
    {
      type: "queen",
      movementDirection: [
        "up",
        "down",
        "right",
        "left",
        "diagLeftUp",
        "diagLeftDown",
        "diagRightUp",
        "diagRightDown",
      ],
      range: 8,
    },
    {
      type: "rook",
      movementDirection: ["up", "down", "right", "left"],
      range: 8,
    },
    {
      type: "bishop",
      movementDirection: [
        "diagLeftUp",
        "diagLeftDown",
        "diagRightUp",
        "diagRightDown",
      ],
      range: 8,
    },
    {
      type: "knight",
      movementDirection: [
        "oneOclock",
        "twoOclock",
        "fourOclock",
        "fiveOclock",
        "sevenOclock",
        "eightOclock",
        "tenOclock",
        "elevenOclock",
      ],
      range: 1,
    },
  ];
  const mousePos = position;
  const squareWidth = width / 6;
  const boxXStart = width / 2 - squareWidth / 2;
  const boxYStart = width / 2 - squareWidth * 2;

  let newType;

  for (let i = 0; i < 4; i++) {
    if (
      mousePos.x > boxXStart &&
      mousePos.x < boxXStart + squareWidth &&
      mousePos.y > boxYStart + i * squareWidth &&
      mousePos.y < boxYStart + (i + 1) * squareWidth
    ) {
      newType = pawnOptions[i];
    }
  }
  if (!newType) return;
  const pieceToChange = checkPawnQueening(player.color);

  pieceToChange.type = newType.type;
  pieceToChange.movementDirection = newType.movementDirection;
  pieceToChange.range = newType.range;

  //check whether the pawn promotion has put the king in check and return king in check as true
  const defendingColor = player.color === "white" ? "black" : "white";
  const adjustedWhitePieces = JSON.parse(JSON.stringify(whitePieces));
  const adjustedBlackPieces = JSON.parse(JSON.stringify(blackPieces));
  const squareToCheck =
    player.color === "white"
      ? blackPieces.find((piece) => piece.type === "king")
      : whitePieces.find((piece) => piece.type === "king");

  if (
    checkSquareAttacked(
      defendingColor,
      adjustedWhitePieces,
      adjustedBlackPieces,
      squareToCheck,
      grid,
      width,
      player.color
    ) === true
  )
    squareToCheck.inCheck = true;

  socket.emit("send-message", {
    white: whitePieces,
    black: blackPieces,
    taken: { white: whitePiecesTaken, black: blackPiecesTaken },
  });
  player.turn = false;
};
