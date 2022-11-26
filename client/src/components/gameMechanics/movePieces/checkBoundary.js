//checks whether the x and y position are within the boundaries of any given square
export const checkBoundary = (position, grid, width) => {
  const radius = width / 16;
  const selectedSquare = grid.find((square) => {
    return (
      position.x > square.coord.x - radius &&
      position.x < square.coord.x + radius &&
      position.y > square.coord.y - radius &&
      position.y < square.coord.y + radius
    );
  });

  return selectedSquare;
};
