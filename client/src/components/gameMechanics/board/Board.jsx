import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import "./BoardStyles.scss";
import Canvas from "../../Canvas";
import { createGrid } from "./createGrid";
import { activatePiece, deactivatePiece } from "../movePieces/activatePiece";
import { SocketContext } from "../../../context/SocketContext";
import {
  blackPieces,
  blackPiecesTaken,
  defaultBlackPieces,
} from "../pieces/blackPieces";
import {
  defaultWhitePieces,
  whitePieces,
  whitePiecesTaken,
} from "../pieces/whitePieces";
import WaitingSpinner from "./WaitingSpinner";
import Clock from "./Clock";
import SideCanvas from "../sideCanvas/SideCanvas";
import { removeEnPassante } from "../enPassante/removeEnPassante";
import {
  sockColorListen,
  socketListenerOff,
  socketListenerOn,
} from "../socketListeners/socketListenerOn";

function Board() {
  const socket = useContext(SocketContext);
  const windowWidth =
    window.innerWidth < 480 ? window.innerWidth - 20 : window.innerWidth * 0.5;
  const [passableGrid, setPassableGrid] = useState(null);
  const [opponentName, setOpponentName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [timerActive, setTimerActive] = useState(true);
  // const initialWidth =
  //   window.innerWidth * 0.5 > window.innerHeight * 0.7
  //     ? window.innerHeight * 0.7
  //     : window.innerWidth * 0.5;
  const [width, setWidth] = useState(windowWidth);
  const [winBannerText, setWinBannerText] = useState(null);

  const playerColor = useRef();
  const playerRef = useRef({ turn: false, color: "" });
  const { duration } = useParams();
  const [seconds, setSeconds] = useState(duration * 60);
  const [oppSeconds, setOppSeconds] = useState(duration * 60);

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
    socketListenerOn(socket);
    socket.on("player-disconnect", () => {
      setWinBannerText(
        "Other Player Has Disconnected. Connecting with New Game"
      );
      playerRef.current.turn = false;
      socket.emit("join-game", { duration: duration });
    });

    //setting player color and starting off turn.  Create a grid based on the player's color
    socket.on("color-set", (colorObj) => {
      console.log(defaultBlackPieces, defaultWhitePieces, "default");
      blackPieces.splice(
        0,
        defaultBlackPieces.length,
        ...JSON.parse(JSON.stringify(defaultBlackPieces))
      );
      whitePieces.splice(
        0,
        defaultWhitePieces.length,
        ...JSON.parse(JSON.stringify(defaultWhitePieces))
      );
      whitePiecesTaken.splice(0, whitePiecesTaken.length);
      blackPiecesTaken.splice(0, blackPiecesTaken.length);
      setPlayerName(
        colorObj.names.filter((player) => player.id === socket.id)[0].name
      );
      setOpponentName(
        colorObj.names.filter((player) => player.id !== socket.id)[0].name
      );
      setSeconds(duration * 10);
      setOppSeconds(duration * 10);
      setWinBannerText("");
      if (socket.id === colorObj.white) {
        playerRef.current.turn = true;
        playerRef.current.color = "white";
        grid = createGrid(windowWidth, "white");
        setPassableGrid(grid);
        playerColor.current = "white";
      }
      if (socket.id === colorObj.black) {
        playerRef.current.turn = false;
        playerRef.current.color = "black";
        grid = createGrid(windowWidth, "black");
        setPassableGrid(grid);
        playerColor.current = "black";
      }
    });

    //every turn this is passed over to the other player
    socket.on("update-pieces", (pieces) => {
      playerRef.current.turn = true;
      whitePieces.splice(0, whitePieces.length, ...pieces.white);
      blackPieces.splice(0, blackPieces.length, ...pieces.black);
      whitePiecesTaken.splice(
        0,
        whitePiecesTaken.length,
        ...pieces.taken.white
      );
      blackPiecesTaken.splice(
        0,
        blackPiecesTaken.length,
        ...pieces.taken.black
      );
      playerRef.current.color === "white"
        ? removeEnPassante(whitePieces)
        : removeEnPassante(blackPieces);
    });
    //on winning
    socket.on("player-win", (winObj) => {
      setWinBannerText(
        `${winObj.winningPlayer.toUpperCase()} is the Winner by ${winObj.method.toUpperCase()}`
      );
      whitePieces.splice(0, whitePieces.length, ...winObj.finalPosition.white);
      blackPieces.splice(0, blackPieces.length, ...winObj.finalPosition.black);
      whitePiecesTaken.splice(
        0,
        whitePiecesTaken.length,
        ...winObj.taken.white
      );
      blackPiecesTaken.splice(
        0,
        blackPiecesTaken.length,
        ...winObj.taken.black
      );
      setTimerActive(false);
    });
    //on drawing
    socket.on("player-draw", (drawObj) => {
      setWinBannerText(`The Game is a Draw by ${drawObj.method.toUpperCase()}`);
      whitePieces.splice(0, whitePieces.length, ...drawObj.finalPosition.white);
      blackPieces.splice(0, blackPieces.length, ...drawObj.finalPosition.black);
      whitePiecesTaken.splice(
        0,
        whitePiecesTaken.length,
        ...drawObj.taken.white
      );
      blackPiecesTaken.splice(
        0,
        blackPiecesTaken.length,
        ...drawObj.taken.black
      );
      setTimerActive(false);
    });
    return () => {
      socketListenerOff(socket);
      socket.off("player-disconnect");
      socket.off("update-pieces");
      socket.off("color-set");
      socket.off("player-win");
      socket.off("player-draw");
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
            <Clock
              player={playerRef}
              seconds={oppSeconds}
              setSeconds={setOppSeconds}
              ownClock={false}
              active={timerActive}
            />
          </div>
        )}
        <div className="takenDiv">
          <div className="takeDiv">
            <SideCanvas width={width} color="white" />
          </div>
          <div className="boardDiv" ref={canvasRef}>
            <Canvas
              width={width}
              grid={passableGrid}
              color={passableGrid && playerRef.current.color}
            />
          </div>
          <div className="takeDiv">
            <SideCanvas width={width} color="black" />
          </div>
        </div>
        <div className="playerNameDiv">
          <h3>{playerName}</h3>
          <Clock
            player={playerRef}
            seconds={seconds}
            setSeconds={setSeconds}
            ownClock={true}
            active={timerActive}
          />
        </div>
      </div>
      <WaitingSpinner grid={passableGrid} />
    </div>
  );
}

export default Board;
