export const drawSquares = (ctx, gridSquares, width) => {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  gridSquares.forEach(({ coord, an }, index) => {
    const radius = width / 16;
    ctx.beginPath();
    if (an.number % 2 !== 0) {
      if (letters.indexOf(an.letter) % 2 !== 0) {
        ctx.fillStyle = "blue";
      } else ctx.fillStyle = "green";
    } else {
      if (letters.indexOf(an.letter) % 2 === 0) {
        ctx.fillStyle = "blue";
      } else ctx.fillStyle = "green";
    }
    ctx.fillRect(coord.x - radius, coord.y - radius, radius * 2, radius * 2);
  });
};
