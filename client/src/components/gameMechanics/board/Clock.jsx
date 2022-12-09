import React, { useContext, useEffect, useState } from "react";
import { blackPieces, blackPiecesTaken } from "../pieces/blackPieces";
import { whitePieces, whitePiecesTaken } from "../pieces/whitePieces";
import { SocketContext } from "../../../context/SocketContext";

function Clock({ player, seconds, setSeconds, ownClock, active }) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    const reduceSecond = () => {
      console.log(active);
      if (!active) return;
      if (ownClock && !player.current.turn) return;
      if (!ownClock && player.current.turn) return;
      if (seconds < 1) return;
      setSeconds((prev) => {
        if (prev === 0) {
          return 0;
        } else return prev - 1;
      });
    };
    socket.on("tick", reduceSecond);
    return () => socket.off("tick");
  }, [socket, active]);

  useEffect(() => {
    if (!ownClock) return;
    if (seconds < 1) {
      sendTimeout(socket, player);
    }
  }, [seconds]);

  return (
    <div>
      <h3>
        {Math.floor(seconds / 60)} :{" "}
        {(seconds % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </h3>
    </div>
  );
}

const sendTimeout = (socket, player) => {
  if (player.current.color === "white" && blackPieces.length === 1)
    return socket.emit("drawn", {
      pieces: { black: blackPieces, white: whitePieces },
      method: "timeout vs insufficient material",
      taken: { white: whitePiecesTaken, black: blackPiecesTaken },
    });
  if (player.current.color === "black" && whitePieces.length === 1)
    return socket.emit("drawn", {
      pieces: { black: blackPieces, white: whitePieces },
      method: "timeout vs insufficient material",
      taken: { white: whitePiecesTaken, black: blackPiecesTaken },
    });

  socket.emit("timeout", {
    winningPlayer: player.current.color === "white" ? "black" : "white",
    pieces: { black: blackPieces, white: whitePieces },
    taken: { white: whitePiecesTaken, black: blackPiecesTaken },
  });
  player.current.turn = false;
};

export default Clock;
