import b_bishop from "../../../assets/black_pieces/black_bishop.svg";
import b_king from "../../../assets/black_pieces/black_king.svg";
import b_knight from "../../../assets/black_pieces/black_knight.svg";
import b_pawn from "../../../assets/black_pieces/black_pawn.svg";
import b_queen from "../../../assets/black_pieces/black_queen.svg";
import b_rook from "../../../assets/black_pieces/black_rook.svg";

//import white pieces
import w_bishop from "../../../assets/white_pieces/white_bishop.svg";
import w_king from "../../../assets/white_pieces/white_king.svg";
import w_knight from "../../../assets/white_pieces/white_knight.svg";
import w_pawn from "../../../assets/white_pieces/white_pawn.svg";
import w_queen from "../../../assets/white_pieces/white_queen.svg";
import w_rook from "../../../assets/white_pieces/white_rook.svg";

const w_king_img = new Image();
w_king_img.src = w_king;
const w_queen_img = new Image();
w_queen_img.src = w_queen;
const w_bishop_img = new Image();
w_bishop_img.src = w_bishop;
const w_knight_img = new Image();
w_knight_img.src = w_knight;
const w_rook_img = new Image();
w_rook_img.src = w_rook;
const w_pawn_img = new Image();
w_pawn_img.src = w_pawn;

const white = {
  king: w_king_img,
  queen: w_queen_img,
  rook: w_rook_img,
  bishop: w_bishop_img,
  knight: w_knight_img,
  pawn: w_pawn_img,
};

const b_king_img = new Image();
b_king_img.src = b_king;
const b_queen_img = new Image();
b_queen_img.src = b_queen;
const b_bishop_img = new Image();
b_bishop_img.src = b_bishop;
const b_knight_img = new Image();
b_knight_img.src = b_knight;
const b_rook_img = new Image();
b_rook_img.src = b_rook;
const b_pawn_img = new Image();
b_pawn_img.src = b_pawn;

const black = {
  king: b_king_img,
  queen: b_queen_img,
  rook: b_rook_img,
  bishop: b_bishop_img,
  knight: b_knight_img,
  pawn: b_pawn_img,
};

export const drawPiece = (ctx, width, properties) => {
  //dynamically select which image we wish to use
  const svgToUse =
    properties.color === "white"
      ? white[properties.type]
      : black[properties.type];

  //draw that image to the canvas
  ctx.drawImage(svgToUse, properties.x, properties.y, width / 8, width / 8);
};
