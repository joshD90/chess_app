export const getXDiff = (direction, width) => {
  let xDiff;
  //see what change we need to make to the x axis
  if (direction === "up" || direction === "down") xDiff = 0;
  if (direction === "left") xDiff = -width / 8;
  if (direction === "right") xDiff = width / 8;

  if (direction === "diagLeftUp" || direction === "diagLeftDown")
    xDiff = -width / 8;
  if (direction === "diagRightUp" || direction === "diagRightDown")
    xDiff = width / 8;

  return xDiff;
};

export const getYDiff = (direction, width) => {
  let yDiff;
  //see what change we need to add to the y axis
  if (direction === "left" || direction === "right") yDiff = 0;
  if (direction === "up") yDiff = -width / 8;
  if (direction === "down") yDiff = width / 8;
  if (direction === "diagLeftUp" || direction === "diagRightUp")
    yDiff = -width / 8;
  if (direction === "diagLeftDown" || direction === "diagRightDown")
    yDiff = width / 8;

  return yDiff;
};

export const getKnightXDiff = (direction, width) => {
  let xDiff;
  if (direction === "oneOclock") xDiff = width / 8;
  if (direction === "twoOclock") xDiff = width / 4;
  if (direction === "fourOclock") xDiff = width / 4;
  if (direction === "fiveOclock") xDiff = width / 8;

  if (direction === "sevenOclock") xDiff = -width / 8;
  if (direction === "eightOclock") xDiff = -width / 4;
  if (direction === "tenOclock") xDiff = -width / 4;
  if (direction === "elevenOclock") xDiff = -width / 8;
  return xDiff;
};

export const getKnightYDiff = (direction, width) => {
  let yDiff;
  if (direction === "oneOclock") yDiff = -width / 4;
  if (direction === "twoOclock") yDiff = -width / 8;
  if (direction === "fourOclock") yDiff = width / 8;
  if (direction === "fiveOclock") yDiff = width / 4;

  if (direction === "sevenOclock") yDiff = width / 4;
  if (direction === "eightOclock") yDiff = width / 8;
  if (direction === "tenOclock") yDiff = -width / 8;
  if (direction === "elevenOclock") yDiff = -width / 4;
  return yDiff;
};
