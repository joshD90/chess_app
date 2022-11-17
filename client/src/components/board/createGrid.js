export const createGrid = (width) => {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const gridSquares = [];
  const squareWidth = width / 8;
  const squareRadius = width / 16;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      gridSquares.push({
        coord: {
          x: i * squareWidth + squareRadius,
          y: j * squareWidth + squareRadius,
        },
        an: { letter: letters[j], number: i + 1 },
      });
    }
  }
  console.log(gridSquares);
  return gridSquares;
};
