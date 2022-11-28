export const whitePieces = [
  {
    type: "king",
    color: "white",
    position: { num: 1, letter: "e" },
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
    range: 1,
    firstMove: true,
  },
  {
    type: "queen",
    color: "white",
    position: { num: 1, letter: "d" },
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
    type: "bishop1",
    color: "white",
    position: { num: 1, letter: "c" },
    movementDirection: [
      "diagLeftUp",
      "diagLeftDown",
      "diagRightUp",
      "diagRightDown",
    ],
    range: 8,
  },
  {
    type: "bishop2",
    color: "white",
    position: { num: 1, letter: "f" },
    movementDirection: [
      "diagLeftUp",
      "diagLeftDown",
      "diagRightUp",
      "diagRightDown",
    ],
    range: 8,
  },
  {
    type: "knight1",
    color: "white",
    position: { num: 1, letter: "b" },
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
  {
    type: "knight2",
    color: "white",
    position: { num: 1, letter: "g" },
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
  {
    type: "rook1",
    color: "white",
    position: { num: 1, letter: "a" },
    movementDirection: ["up", "down", "right", "left"],
    range: 8,
    firstMove: true,
  },
  {
    type: "rook2",
    color: "white",
    position: { num: 1, letter: "h" },
    movementDirection: ["up", "down", "right", "left"],
    range: 8,
    firstMove: true,
  },
  {
    type: "pawn1",
    color: "white",
    position: { num: 2, letter: "a" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn2",
    color: "white",
    position: { num: 2, letter: "b" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn3",
    color: "white",
    position: { num: 2, letter: "c" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn4",
    color: "white",
    position: { num: 2, letter: "d" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn5",
    color: "white",
    position: { num: 2, letter: "e" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn6",
    color: "white",
    position: { num: 2, letter: "f" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn7",
    color: "white",
    position: { num: 2, letter: "g" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
  {
    type: "pawn8",
    color: "white",
    position: { num: 2, letter: "h" },
    movementDirection: ["up", "diagLeftUp", "diagRightUp"],
    range: 1,
    firstMove: true,
  },
];