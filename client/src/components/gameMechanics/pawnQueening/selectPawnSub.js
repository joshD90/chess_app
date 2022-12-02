import { checkPawnQueening } from "./checkPawnQueening";
import { whitePieces } from "../pieces/whitePieces";
import { blackPieces } from "../pieces/blackPieces";

export const selectPawnSub = (e, position, socket, player, width) => {
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

  socket.emit("send-message", { white: whitePieces, black: blackPieces });
  player.turn = false;
};
