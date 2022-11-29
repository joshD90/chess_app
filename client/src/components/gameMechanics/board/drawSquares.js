export const drawSquares = (ctx, gridSquares, width, playerColor) => {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  //for each square we go from the center point and start the square from half the width and height back from that point
  gridSquares.forEach(({ coord, an }, index) => {
    const radius = width / 16;
    ctx.beginPath();
    //set the colors, depending on which row we are in we start the dark squares on an odd or even number
    if (an.number % 2 !== 0) {
      if (letters.indexOf(an.letter) % 2 !== 0) {
        ctx.fillStyle = "lightgreen";
      } else ctx.fillStyle = "blue";
    } else {
      if (letters.indexOf(an.letter) % 2 === 0) {
        ctx.fillStyle = "lightgreen";
      } else ctx.fillStyle = "blue";
    }
    //draw the squares
    ctx.fillRect(coord.x - radius, coord.y - radius, radius * 2, radius * 2);
  });
};
