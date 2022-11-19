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

// const w_king_img = new Image();
// w_king_img.src = w_king;
// const w_queen_img = new Image();
// w_queen_img.src = w_queen;
// const w_bishop_img = new Image();
// w_bishop_img.src = w_bishop;
// const w_knight_img = new Image();
// w_knight_img.src = w_knight;
// const w_rook_img = new Image();
// w_rook_img.src = w_rook;
// const w_pawn_img = new Image();
// w_pawn_img.src = w_pawn;

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
  //dynamically select which image we wish to use
  const svgToUse =
    properties.color === "white"
      ? white[properties.type]
      : black[properties.type];
  //create a new image class
  const img = new Image();
  //add the image data to the source
  img.src = svgToUse;
  //draw that image to the canvas
  ctx.drawImage(img, properties.x, properties.y, width / 8, width / 8);
};
