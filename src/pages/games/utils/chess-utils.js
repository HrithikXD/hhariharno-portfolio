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
    ["6,0", ["pawn", 1]],
    ["6,1", ["pawn", 1]],
    ["6,2", ["pawn", 1]],
    ["6,3", ["pawn", 1]],
    ["6,4", ["pawn", 1]],
    ["6,5", ["pawn", 1]],
    ["6,6", ["pawn", 1]],
    ["6,7", ["pawn", 1]],
    ["7,4", ["king", 1000]],
    ["7,0", ["rook", 5]],
    ["7,7", ["rook", 5]],
    ["7,2", ["bishop", 3]],
    ["7,5", ["bishop", 3]],
    ["7,1", ["knight", 3]],
    ["7,6", ["knight", 3]],
    ["7,3", ["queen", 9]],
  ]),
  false: new Map([
    ["1,0", ["pawn", 1]],
    ["1,1", ["pawn", 1]],
    ["1,2", ["pawn", 1]],
    ["1,3", ["pawn", 1]],
    ["1,4", ["pawn", 1]],
    ["1,5", ["pawn", 1]],
    ["1,6", ["pawn", 1]],
    ["1,7", ["pawn", 1]],
    ["0,4", ["king", 1000]],
    ["0,0", ["rook", 5]],
    ["0,7", ["rook", 5]],
    ["0,2", ["bishop", 3]],
    ["0,5", ["bishop", 3]],
    ["0,1", ["knight", 3]],
    ["0,6", ["knight", 3]],
    ["0,3", ["queen", 9]],
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

const easyMoves = (move) => {
  const fromPositions = [...move.keys()];
  const randomFrom =
    fromPositions[Math.floor(Math.random() * fromPositions.length)];

  const destinations = [...move.get(randomFrom).keys()];
  const randomTo =
    destinations[Math.floor(Math.random() * destinations.length)];

  return { from: randomFrom, to: randomTo };
};

const mediumMoves = (positions, allMoves) => {
  let bestMove = null;
  let bestScore = -Infinity;
  
  // Position evaluation bonuses
  const centerSquares = new Set(["3,3", "3,4", "4,3", "4,4"]);
  const nearCenterSquares = new Set([
    "2,2", "2,3", "2,4", "2,5", 
    "3,2", "3,5", "4,2", "4,5", 
    "5,2", "5,3", "5,4", "5,5"
  ]);
  
  // Calculate current move count (approximation)
  const moveCount = 32 - (positions.true.size + positions.false.size);
  
  // Generate opponent (player's) possible moves to analyze threats
  const playerMoves = genMoves(positions, "true");
  
  // Create a set of threatened positions (squares the human player can attack)
  const threatenedSquares = new Set();
  for (const [fromStr, toMap] of playerMoves) {
    for (const toStr of toMap.keys()) {
      threatenedSquares.add(toStr);
    }
  }
  
  // Evaluate each possible CPU move
  for (const [fromStr, toMap] of allMoves) {
    const [attackerType, attackerValue] = positions.false.get(fromStr);
    
    for (const toStr of toMap.keys()) {
      let score = 0;
      const [fromRow, fromCol] = fromStr.split(",").map(Number);
      const [toRow, toCol] = toStr.split(",").map(Number);
      
      // 1. Material evaluation - Captures
      if (positions.true.has(toStr)) {
        const [defenderType, defenderValue] = positions.true.get(toStr);
        
        // Value of capturing opponent's pieces
        score += defenderValue * 10;
        
        // Trade evaluation
        const materialGain = defenderValue - attackerValue;
        score += materialGain * 5;
      }
      
      // 2. Piece safety - check if the move saves a threatened piece
      if (threatenedSquares.has(fromStr)) {
        score += attackerValue * 4; // Bonus for moving away from danger
      }
      
      // 3. Move safety - avoid moving to threatened squares
      if (threatenedSquares.has(toStr)) {
        // Check if the target square is defended by one of our pieces
        let isDefended = false;
        for (const [cpuFromStr, cpuToMap] of allMoves) {
          if (cpuFromStr !== fromStr && cpuToMap.has(toStr)) {
            isDefended = true;
            break;
          }
        }
        
        if (!isDefended) {
          // Penalize moving to a threatened square without defense
          score -= attackerValue * 8;
        } else {
          // Still somewhat penalize even if the square is defended
          score -= attackerValue * 2;
        }
      }
      
      // 4. Positional evaluation
      // Bonus for controlling the center
      if (centerSquares.has(toStr)) {
        score += 3;
      } else if (nearCenterSquares.has(toStr)) {
        score += 1;
      }
      
      // 5. Development bonuses
      // Pawn advancement
      if (attackerType === "pawn") {
        // Bonus for advancing pawns
        score += (toRow - fromRow) * 0.5;
        
        // Extra bonus for pawns nearing promotion
        if (toRow >= 5) {
          score += (toRow - 4) * 2;
        }
        
        // Bonus for initial double pawn move
        if (fromRow === 1 && toRow === 3) {
          score += 1;
        }
      }
      
      // Develop minor pieces early
      if ((attackerType === "knight" || attackerType === "bishop") && moveCount < 10) {
        if (fromRow === 0 && toRow > 0) {
          score += 2; // Bonus for developing pieces from back rank
        }
      }
      
      // 6. King safety
      if (attackerType === "king") {
        if (moveCount < 15) {
          score -= 3; // Avoid moving king early
        }
        
        // Count nearby enemy pieces as danger
        let dangerLevel = 0;
        for (let r = Math.max(0, toRow - 2); r <= Math.min(7, toRow + 2); r++) {
          for (let c = Math.max(0, toCol - 2); c <= Math.min(7, toCol + 2); c++) {
            const nearbyPos = `${r},${c}`;
            if (positions.true.has(nearbyPos)) {
              dangerLevel++;
            }
          }
        }
        score -= dangerLevel * 2;
      }
      
      // 7. Piece coordination (knights & bishops should support each other)
      if (attackerType === "knight" || attackerType === "bishop") {
        // Count friendly pieces nearby the destination square
        let friendlyNearby = 0;
        for (let r = Math.max(0, toRow - 2); r <= Math.min(7, toRow + 2); r++) {
          for (let c = Math.max(0, toCol - 2); c <= Math.min(7, toCol + 2); c++) {
            const nearbyPos = `${r},${c}`;
            if (positions.false.has(nearbyPos) && nearbyPos !== fromStr) {
              friendlyNearby++;
            }
          }
        }
        score += friendlyNearby * 0.5;
      }
      
      // Update best move if we found a better score
      if (score > bestScore) {
        bestScore = score;
        bestMove = { from: fromStr, to: toStr };
      }
    }
  }
  
  // If no good moves found, just return a random move
  if (bestMove === null && allMoves.size > 0) {
    return easyMoves(allMoves)
  }
  
  return bestMove;
};

const genMoves = (positions, player) => {
  let move = new Map();
  for (const key of positions[player]) {
    const [row, col] = key[0].split(",").map(Number);
    const moveTo = [
      [key[1], player],
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
  return move;
};

export const genLeagalMoves = (positions, difficulty) => {
  const move = genMoves(positions, false);
  switch (difficulty) {
    case 0:
      return easyMoves(move);
    case 1:
      return mediumMoves(positions, move);
    default:
      return easyMoves(move);
  }
};
