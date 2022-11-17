import b_bishop from "../../assets/black_pieces/black_bishop.svg";
import b_king from "../../assets/black_pieces/black_king.svg";
import b_knight from "../../assets/black_pieces/black_knight.svg";
import b_pawn from "../../assets/black_pieces/black_pawn.svg";
import b_queen from "../../assets/black_pieces/black_queen.svg";
import b_rook from "../../assets/black_pieces/black_rook.svg";

//import white pieces
import w_bishop from "../../assets/white_pieces/white_bishop.svg";
import w_king from "../../assets/white_pieces/white_king.svg";
import w_knight from "../../assets/white_pieces/white_knight.svg";
import w_pawn from "../../assets/white_pieces/white_pawn.svg";
import w_queen from "../../assets/white_pieces/white_queen.svg";
import w_rook from "../../assets/white_pieces/white_rook.svg";

const white = {
  king: w_king,
  queen: w_queen,
  rook: w_rook,
  bishop: w_bishop,
  knight: w_knight,
  pawn: w_pawn,
};

const black = {
  king: b_king,
  queen: b_queen,
  rook: b_rook,
  bishop: b_bishop,
  knight: b_knight,
  pawn: b_pawn,
};

export const drawPiece = (ctx, width, properties) => {
  const svgToUse =
    properties.color === "white"
      ? white[properties.type]
      : black[properties.type];
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, properties.x, properties.y, width / 8, width / 8);
  };
  img.src = svgToUse;
};
