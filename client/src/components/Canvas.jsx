import React, { useRef, useEffect, useState, useCallback } from "react";
import { drawSquares } from "./gameMechanics/board/drawSquares";
import { drawCheck } from "./gameMechanics/pieces/drawCheck";
import { drawPieces } from "./gameMechanics/pieces/drawPieces";
import { drawMovingPiece } from "./gameMechanics/movePieces/drawMovingPiece";
import { drawPawnOptions } from "./gameMechanics/pawnQueening/drawPawnOptions";

function Canvas({ width, color, grid }) {
  //set up our null canvas ref referencing the canvas element
  const canvasRef = useRef(null);
  //we set up mouse pos ref to keep the whole component from re-rendering every time the mouse moves
  //as opposed to usestate
  const mousePosRef = useRef({ x: 0, y: 0 });

  //usecallback to avoid recalculating this unnecessarily.  Needs to update everytime our grid or mousepos updates
  const renderFrame = useCallback(() => {
    //if the grid hasn't been updated yet due to waiting on the socket in board component return
    if (!grid) return;
    //get our context
    const ctx = canvasRef.current.getContext("2d");
    //draw all our pieces in order of what needs to be on top
    drawSquares(ctx, grid, width, color);
    drawCheck(ctx, grid, width);
    drawPieces(ctx, width, "white", grid);
    drawPieces(ctx, width, "black", grid);
    drawMovingPiece(ctx, width, mousePosRef.current);

    drawPawnOptions(ctx, color, width);
  }, [grid, mousePosRef, width, color]);

  //runs with every request animation frame. calls recursively
  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };
  //grid as dependency as this will initially be null before being set by socket
  useEffect(() => {
    requestAnimationFrame(tick);
    //cleanup
    return () => cancelAnimationFrame(tick);
  }, [grid]);

  //attach a mouse move listener to our canvas ref
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const doMouseMove = (e) => {
      const x =
        e.type === "touchmove" || e.type === "touchstart"
          ? e.touches[0].clientX - e.target.offsetLeft
          : e.clientX - e.target.offsetLeft;
      const y =
        e.type === "touchmove" || e.type === "touchstart"
          ? e.touches[0].clientY - e.target.offsetTop
          : e.clientY - e.target.offsetTop;
      mousePosRef.current = {
        x: x,
        y: y,
      };
    };
    element.addEventListener("touchstart", doMouseMove);
    element.addEventListener("mousemove", doMouseMove);
    element.addEventListener("touchmove", doMouseMove);
    //clean up
    return () => {
      element.removeEventListener("touchstart", doMouseMove);
      element.removeEventListener("mousemove", doMouseMove);
      element.removeEventListener("touchmove", doMouseMove);
    };
  }, [canvasRef, canvasRef.current]);

  return <canvas ref={canvasRef} width={width} height={width} />;
}

export default Canvas;
