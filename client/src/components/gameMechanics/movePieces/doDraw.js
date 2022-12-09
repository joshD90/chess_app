import { removeNumber } from "../pieces/removeNumber";

export const doDraw = (
  blackPieces,
  whitePieces,
  socket,
  player,
  whitePiecesTaken,
  blackPiecesTaken
) => {
  let drawn;
  //this will be triggered on any insufficient material draw condition
  const sendDraw = () => {
    socket.emit("drawn", {
      pieces: { black: blackPieces, white: whitePieces },
      method: "insufficient material",
      taken: { white: whitePiecesTaken, black: blackPiecesTaken },
    });
    player.turn = false;
    return true;
  };

  const mapTypes = (pieces) => {
    const mappedTypes = pieces.map((piece) => {
      const type = removeNumber(piece.type);
      return type;
    });
    return mappedTypes;
  };
  //if any one player has 3 or more pieces checkmate can still be achieved
  if (blackPieces.length > 2 || whitePieces.length > 2) return (drawn = false);
  //just two kings
  if (blackPieces.length === 1 && whitePieces.length === 1) return sendDraw();
  //king and bishop vs king or king and knight vs king
  if (
    blackPieces.length === 1 &&
    (mapTypes(whitePieces)[1] === "bishop" ||
      mapTypes(whitePieces)[1] === "knight")
  )
    return sendDraw();
  if (
    whitePieces.length === 1 &&
    (mapTypes(blackPieces)[1] === "bishop" ||
      mapTypes(blackPieces)[1] === "knight")
  )
    return sendDraw();
  //king and bishop vs king and same color bishop
  if (blackPieces.length === 2 && whitePieces.length === 2) {
    if (
      (blackPieces[1].type === "bishop1" &&
        whitePieces[1].type === "bishop2") ||
      (blackPieces[1].type === "bishop2" && whitePieces[1].type === "bishop1")
    )
      return sendDraw();
  }
  return drawn;
};
