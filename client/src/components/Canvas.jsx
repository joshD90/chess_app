import React, { useRef, useEffect } from "react";

function Canvas({ draw, width, height }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    draw(context);
  });
  return <canvas ref={canvas} width={width} height={height} />;
}

export default Canvas;
