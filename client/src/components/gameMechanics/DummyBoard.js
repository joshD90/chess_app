import React, { useRef } from "react";
import Canvas from "../Canvas";
function DummyBoard() {
  const width = 300;
  const canvasRef = useRef();

  //   const doMouseMove = (e) => {
  //     setPosition((prev) => {
  //       console.log(prev);
  //       return { x: e.clientX, y: e.clientY };
  //     });
  //   };

  const drawSquare = (ctx, position) => {
    if (!position) return;
    console.log(position);
    ctx.beginPath();
    ctx.fillRect(position.x, position.y, 20, 20);
  };

  const draw = (ctx, position) => {
    drawSquare(ctx, position);
  };

  return (
    <div style={{ border: "2px solid black" }} ref={canvasRef}>
      <Canvas draw={draw} height={width} width={width} />
    </div>
  );
}

export default DummyBoard;
