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

export const copyInitialPositions = () => {
  const newB = {
    true: new Map(
      Array.from(initialPositions.true).map(([key, value]) => [key, [...value]])
    ),
    false: new Map(
      Array.from(initialPositions.false).map(([key, value]) => [
        key,
        [...value],
      ])
    ),
  };
  return newB;
};

const checkPawn = (row, col, player, positions) => {
  const res = new Map();
  const direction = player ? -1 : 1;
  const startRow = player ? 6 : 1;

  // One square forward
  const forwardPos = `${row + direction},${col}`;
  if (!positions.true.has(forwardPos) && !positions.false.has(forwardPos)) {
    res.set(forwardPos, "");

    // Two squares forward from start
    const twoForward = `${row + 2 * direction},${col}`;
    if (
      row === startRow &&
      !positions.true.has(twoForward) &&
      !positions.false.has(twoForward)
    ) {
      res.set(twoForward, "");
    }
  }

  // Diagonal captures
  for (const dCol of [-1, 1]) {
    const diagRow = row + direction;
    const diagCol = col + dCol;
    const posStr = `${diagRow},${diagCol}`;
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
    }
  }

  return res;
};

const checkKnight = (row, col, player, positions) => {
  const res = new Map();
  const direction = [
    [2, 1],
    [2, -1],
    [-2, -1],
    [-2, 1],
    [1, 2],
    [1, -2],
    [-1, -2],
    [-1, 2],
  ];

  for (const [r, c] of direction) {
    const i = row + r;
    const j = col + c;
    const posStr = `${i},${j}`;
    if (i < 0 || j < 0 || i > 7 || j > 7) continue;
    if (!positions[player].has(posStr)) {
      if (positions[!player].has(posStr)) {
        res.set(posStr, positions[!player].get(posStr)[0]);
      } else {
        res.set(posStr, "");
      }
    }
  }
  return res;
};

const checkRook = (row, col, player, positions) => {
  const res = new Map();
  //for row up
  for (let r = row - 1; r >= 0; r--) {
    const posStr = `${r},${col}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for row down
  for (let r = row + 1; r <= 7; r++) {
    const posStr = `${r},${col}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for col right
  for (let c = col + 1; c <= 7; c++) {
    const posStr = `${row},${c}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for col left
  for (let c = col - 1; c >= 0; c--) {
    const posStr = `${row},${c}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }

  return res;
};

const checkBishop = (row, col, player, positions) => {
  const res = new Map();
  //for dia up-right
  for (let i = 1; row - i >= 0 && col + i <= 7; i++) {
    const posStr = `${row - i},${col + i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia up-left
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const posStr = `${row - i},${col - i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia down-right
  for (let i = 1; row + i <= 7 && col + i <= 7; i++) {
    const posStr = `${row + i},${col + i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia down-left
  for (let i = 1; row + i <= 7 && col - i >= 0; i++) {
    const posStr = `${row + i},${col - i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  return res;
};

const checkQueen = (row, col, player, positions) => {
  const res = new Map();
  //for row up
  for (let r = row - 1; r >= 0; r--) {
    const posStr = `${r},${col}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for row down
  for (let r = row + 1; r <= 7; r++) {
    const posStr = `${r},${col}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for col right
  for (let c = col + 1; c <= 7; c++) {
    const posStr = `${row},${c}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for col left
  for (let c = col - 1; c >= 0; c--) {
    const posStr = `${row},${c}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia up-right
  for (let i = 1; row - i >= 0 && col + i <= 7; i++) {
    const posStr = `${row - i},${col + i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia up-left
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const posStr = `${row - i},${col - i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia down-right
  for (let i = 1; row + i <= 7 && col + i <= 7; i++) {
    const posStr = `${row + i},${col + i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  //for dia down-left
  for (let i = 1; row + i <= 7 && col - i >= 0; i++) {
    const posStr = `${row + i},${col - i}`;
    if (positions[player].has(posStr)) {
      break;
    }
    if (positions[!player].has(posStr)) {
      res.set(posStr, positions[!player].get(posStr)[0]);
      break;
    } else {
      res.set(posStr, "");
    }
  }
  return res;
};

const checkKing = (row, col, player, positions) => {
  const res = new Map();
  const direction = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];

  for (const [r, c] of direction) {
    const i = row + r;
    const j = col + c;
    const posStr = `${i},${j}`;
    if (i < 0 || j < 0 || i > 7 || j > 7) continue;
    if (!positions[player].has(posStr)) {
      if (positions[!player].has(posStr)) {
        res.set(posStr, positions[!player].get(posStr)[0]);
      } else {
        res.set(posStr, "");
      }
    }
  }
  return res;
};

export const onClick = (moveTo, positions) => {
  const piece = moveTo[0][0][0];
  const curPlayer = moveTo[0][1];
  const [r, c] = moveTo[1];
  let move = null;
  switch (piece) {
    case "pawn":
      move = checkPawn(r, c, curPlayer, positions);
      break;
    case "knight":
      move = checkKnight(r, c, curPlayer, positions);
      break;
    case "rook":
      move = checkRook(r, c, curPlayer, positions);
      break;
    case "bishop":
      move = checkBishop(r, c, curPlayer, positions);
      break;
    case "queen":
      move = checkQueen(r, c, curPlayer, positions);
      break;
    case "king":
      move = checkKing(r, c, curPlayer, positions);
      break;
    default:
      break;
  }
  return move;
};

export const genLeagalMoves = (positions) => {
  let move = new Map();
  for (const key of positions.false) {
    const [row, col] = key[0].split(",").map(Number);
    const moveTo = [
      [key[1], false],
      [row, col],
    ];
    const result = onClick(moveTo, positions);
    for (const [k, v] of result) {
      if (!move.has(key[0])) {
        move.set(key[0], new Map());
      }
      move.get(key[0]).set(k, v);
    }
  }
  const fromPositions = [...move.keys()];
  const randomFrom =
    fromPositions[Math.floor(Math.random() * fromPositions.length)];

  const destinations = [...move.get(randomFrom).keys()];
  const randomTo =
    destinations[Math.floor(Math.random() * destinations.length)];

  return { from: randomFrom, to: randomTo };
};
