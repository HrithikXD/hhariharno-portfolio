export const initialChessBoard = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];
export const initialPositions = {
  true: new Map([
    ["6,0", ["pawn", true]],
    ["6,1", ["pawn", true]],
    ["6,2", ["pawn", true]],
    ["6,3", ["pawn", true]],
    ["6,4", ["pawn", true]],
    ["6,5", ["pawn", true]],
    ["6,6", ["pawn", true]],
    ["6,7", ["pawn", true]],
    ["7,4", ["king", true]],
    ["7,0", ["rook", true]],
    ["7,7", ["rook", true]],
    ["7,2", ["bishop", true]],
    ["7,5", ["bishop", true]],
    ["7,1", ["knight", true]],
    ["7,6", ["knight", true]],
    ["7,3", ["queen", true]],
  ]),
  false: new Map([
    ["1,0", ["pawn", true]],
    ["1,1", ["pawn", true]],
    ["1,2", ["pawn", true]],
    ["1,3", ["pawn", true]],
    ["1,4", ["pawn", true]],
    ["1,5", ["pawn", true]],
    ["1,6", ["pawn", true]],
    ["1,7", ["pawn", true]],
    ["0,4", ["king", true]],
    ["0,0", ["rook", true]],
    ["0,7", ["rook", true]],
    ["0,2", ["bishop", true]],
    ["0,5", ["bishop", true]],
    ["0,1", ["knight", true]],
    ["0,6", ["knight", true]],
    ["0,3", ["queen", true]],
  ]),
};

export const onClick = (piece, r, c, board) => {
  console.log(piece, r, c);
};
