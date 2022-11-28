import React, {
  useEffect,
  useRef,
  useContext,
  useCallback,
  useState,
} from "react";
import "./BoardStyles.scss";
import Canvas from "../../Canvas";
import { createGrid } from "./createGrid";
import { drawSquares } from "./drawSquares";
import { drawPieces } from "../pieces/drawPieces";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { drawMovingPiece } from "../movePieces/drawMovingPiece";
import { drawCheck } from "../pieces/drawCheck";
import { SocketContext } from "../../../context/SocketContext";
import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";

const width = 600;

function Board() {
  const socket = useContext(SocketContext);
  const [color, setColor] = useState({});

  useEffect(() => {
    socket.on("connect", () =>
      console.log("connected to socket.io whoop", socket.id)
    );
    socket.on("update-pieces", (pieces) => {
      console.log(pieces.white, pieces.black);

      whitePieces.splice(0, whitePieces.length - 1, ...pieces.white);
      blackPieces.splice(0, blackPieces.length - 1, ...pieces.black);
    });
    socket.on("color-set", (colorObj) => {});
    return () => {
      socket.off("connect");
      socket.off("update-pieces");
      socket.off("color-set");
    };
  }, [socket]);

  //create a link to the actual DOM canvas element
  const canvasRef = useRef();
  const mousePosRef = React.createRef();

  const grid = createGrid(width);
  //this runs in our mousemove event listner
  // const getMousePos = useCallback(
  //   (e) => {
  //     mousePosRef.current = { x: e.clientX, y: e.clientY };
  //   },
  //   [mousePosRef]
  // );

  useEffect(() => {
    const effectCanvasRef = canvasRef;
    const doMouseUp = (e) => {
      deactivatePiece(e, socket);
    };
    //when our canvas component mounts we add a listener to see what the mouse is doing so that pieces can be moved accordingly
    effectCanvasRef &&
      effectCanvasRef.current.addEventListener("mousedown", activatePiece);
    // effectCanvasRef &&
    //   effectCanvasRef.current.addEventListener("mousemove", getMousePos);
    effectCanvasRef &&
      effectCanvasRef.current.addEventListener("mouseup", doMouseUp);
    return () => {
      //we remove the event listeners on component dismounted making sure that listeners don't build on top of each other

      effectCanvasRef.current.removeEventListener("mousedown", activatePiece);

      // effectCanvasRef.current.removeEventListener("mousemove", getMousePos);

      effectCanvasRef.current.removeEventListener("mouseup", deactivatePiece);
    };
  }, [socket]);

  //this is our main event loop for drawing all our pieces.  This is passed to the canvas component which executes it there where we can access our 2d context
  const draw = (ctx, position) => {
    drawSquares(ctx, grid, width);
    drawCheck(ctx, grid, width);
    drawPieces(ctx, width, "white");
    drawPieces(ctx, width, "black");
    drawMovingPiece(ctx, width, position);
  };

  return (
    <div className="boardDiv" ref={canvasRef}>
      <Canvas draw={draw} height={width} width={width} />
    </div>
  );
}

export default Board;
