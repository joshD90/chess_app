export const createGrid = (width, playerColor) => {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const gridSquares = [];
  const squareWidth = width / 8;
  const squareRadius = width / 16;
  //create our grid, i loop covers the x axis, j covers y axis.
  //we create two properties for x and y coord as well as the conventional algebraic notation
  //used in chess for ease of use. Each square coord is defined by its center point

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const alteredJ = playerColor === "white" ? 7 - j : j;
      const alteredI = playerColor === "white" ? i : 7 - i;

      gridSquares.push({
        coord: {
          x: alteredI * squareWidth + squareRadius,
          y: alteredJ * squareWidth + squareRadius,
        },
        an: { letter: letters[i], number: j + 1 },
      });
    }
  }

  return gridSquares;
};
