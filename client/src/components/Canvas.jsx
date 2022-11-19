import React, { useRef, useEffect } from "react";

function Canvas({ draw, width, height }) {
  const canvas = useRef();
  //this animation function calls itself in an infinite recursive loop.
  const tick = () => {
    const context = canvas.current.getContext("2d");
    draw(context);
    requestAnimationFrame(tick);
  };
  //on load we request animationFrame for smooth rerendering of the board
  useEffect(() => {
    requestAnimationFrame(tick);
  }, []);
  return <canvas ref={canvas} width={width} height={width} />;
}

export default Canvas;
