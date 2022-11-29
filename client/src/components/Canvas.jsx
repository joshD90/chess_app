import React, { useRef, useEffect, useState, useCallback } from "react";

function Canvas({ draw, width, height }) {
  const canvas = useRef();
  const [position, setPosition] = useState(null);
  const mousePosRef = React.createRef();

  const doMouseMove = useCallback(
    (e) => {
      // setPosition((prev) => {
      //   return { ...prev, x: e.clientX, y: e.clientY };
      // });
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    },
    [mousePosRef]
  );

  useEffect(() => {
    const element = canvas.current;

    element.addEventListener("mousemove", doMouseMove);
    return () => element.removeEventListener("mousemove", doMouseMove);
  }, [doMouseMove]);

  //this animation function calls itself in an infinite recursive loop.
  const tick = useCallback(() => {
    const context = canvas.current.getContext("2d");
    draw(context, mousePosRef.current);
    requestAnimationFrame(tick);
  }, [draw, position]);
  //on load we request animationFrame for smooth rerendering of the board
  useEffect(() => {
    requestAnimationFrame(tick);
    return () => cancelAnimationFrame(tick);
  }, [tick]);
  return <canvas ref={canvas} width={width} height={width} />;
}

export default Canvas;
