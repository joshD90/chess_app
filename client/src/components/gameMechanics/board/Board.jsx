import React, { useEffect, useRef, useContext, useState } from "react";
import "./BoardStyles.scss";
import Canvas from "../../Canvas";
import { createGrid } from "./createGrid";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { SocketContext } from "../../../context/SocketContext";
import { blackPieces } from "../pieces/blackPieces";
import { whitePieces } from "../pieces/whitePieces";
import WaitingSpinner from "./WaitingSpinner";
import Clock from "./Clock";

function Board() {
  const socket = useContext(SocketContext);
  const [passableGrid, setPassableGrid] = useState(null);
  const [opponentName, setOpponentName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [width, setWidth] = useState(window.innerWidth * 0.5);
  const [winBannerText, setWinBannerText] = useState(null);
  const playerColor = useRef();
  const playerRef = useRef({ turn: false, color: "" });

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(Math.floor(window.innerWidth * 0.5));

  //     if (!playerColor.current) return;
  //     setPassableGrid(
  //       createGrid(Math.floor(window.innerWidth * 0.5), playerColor.current)
  //     );
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [playerColor]);

  //create a link to the actual DOM canvas element
  const canvasRef = useRef();
  let grid;
  useEffect(() => {
    socket.on("color-set", (colorObj) => {
      setPlayerName(
        colorObj.names.filter((player) => player.id === socket.id)[0].name
      );
      setOpponentName(
        colorObj.names.filter((player) => player.id !== socket.id)[0].name
      );
      if (socket.id === colorObj.white) {
        playerRef.current.turn = true;
        playerRef.current.color = "white";
        grid = createGrid(width, "white");
        setPassableGrid(grid);
        playerColor.current = "white";
      }
      if (socket.id === colorObj.black) {
        playerRef.current.turn = false;
        playerRef.current.color = "black";
        grid = createGrid(width, "black");
        setPassableGrid(grid);
        playerColor.current = "black";
      }
    });
    socket.on("update-pieces", (pieces) => {
      playerRef.current.turn = true;
      whitePieces.splice(0, whitePieces.length, ...pieces.white);
      blackPieces.splice(0, blackPieces.length, ...pieces.black);
    });
    socket.on("player-win", (winObj) => {
      setWinBannerText(
        `${winObj.winningPlayer} is the winner by ${winObj.method}`
      );

      whitePieces.splice(0, whitePieces.length, ...winObj.finalPosition.white);
      blackPieces.splice(0, blackPieces.length, ...winObj.finalPosition.black);
    });
    return () => {
      socket.off("update-pieces");
      socket.off("color-set");
      socket.off("player-win");
    };
  }, []);

  //handles our event listeners
  useEffect(() => {
    //get a ref of our div surrouding the canvas
    const element = canvasRef.current;
    //drop the piece
    const doMouseUp = (e) => {
      deactivatePiece(e, socket, playerRef, grid, width);
    };
    //activate piece
    const doMouseDown = (e) => {
      playerRef.current &&
        activatePiece(e, playerRef.current, grid, width, socket);
    };

    //when our canvas component mounts we add a listener to see what the mouse is doing so that pieces can be moved accordingly
    element.addEventListener("mousedown", doMouseDown);
    element.addEventListener("mouseup", doMouseUp);

    return () => {
      //we remove the event listeners on component dismounted making sure that listeners don't build on top of each other
      element.removeEventListener("mousedown", activatePiece);
      element.removeEventListener("mouseup", deactivatePiece);
    };
  }, [socket, playerRef.current, width]);

  return (
    <div className="boardWrapper">
      {winBannerText && <h1>{winBannerText}</h1>}
      <div style={{ opacity: passableGrid ? 1 : 0 }}>
        {playerRef && (
          <div className="topDiv">
            <h3>You are connected with {opponentName}</h3>
            <Clock player={playerRef} />
          </div>
        )}
        <div className="boardDiv" ref={canvasRef}>
          <Canvas
            width={width}
            grid={passableGrid}
            color={passableGrid && playerRef.current.color}
          />
        </div>
        <h3>{playerName}</h3>
      </div>
      <WaitingSpinner grid={passableGrid} />
    </div>
  );
}

export default Board;
