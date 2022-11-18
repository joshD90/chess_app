import React, { useRef, useEffect } from "react";

function Canvas({ draw, width, height }) {
  const canvas = useRef();

  const tick = () => {
    const context = canvas.current.getContext("2d");
    draw(context);
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
  }, []);
  return <canvas ref={canvas} width={width} height={width} />;
}

export default Canvas;
