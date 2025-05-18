export const hardMoves = (positions, allMoves) => {
  // Depth for minimax search (increase for stronger play but slower performance)
  const SEARCH_DEPTH = 2;

  // Piece values
  const pieceValues = {
    pawn: 1,
    knight: 3,
    bishop: 3.25, // Slightly higher than knight in open positions
    rook: 5,
    queen: 9,
    king: 1000,
  };

  // Position evaluation constants
  const centerSquares = new Set(["3,3", "3,4", "4,3", "4,4"]);
  const extendedCenterSquares = new Set([
    "2,2",
    "2,3",
    "2,4",
    "2,5",
    "3,2",
    "3,5",
    "4,2",
    "4,5",
    "5,2",
    "5,3",
    "5,4",
    "5,5",
  ]);

  // Calculate current game phase (opening, middlegame, endgame)
  const totalPieces = positions.true.size + positions.false.size;
  const gamePhase =
    totalPieces > 28 ? "opening" : totalPieces > 15 ? "middlegame" : "endgame";

  // Main entry point
  function findBestMove() {
    let bestMove = null;
    let bestScore = -Infinity;

    // Generate all opponent moves for threat analysis
    const playerMoves = genMoves(positions, "true");

    // For each possible CPU move
    for (const [fromStr, toMap] of allMoves) {
      for (const toStr of toMap.keys()) {
        // Clone positions to simulate move
        const newPositions = simulateMove(positions, fromStr, toStr, false);

        // Evaluate position after move with minimax
        const score = minimax(
          newPositions,
          SEARCH_DEPTH - 1,
          -Infinity,
          Infinity,
          false
        );

        if (score > bestScore) {
          bestScore = score;
          bestMove = { from: fromStr, to: toStr };
        }
      }
    }

    // If no good move found, pick a random one
    if (bestMove === null && allMoves.size > 0) {
      const fromEntries = [...allMoves.entries()];
      const randomFromIdx = Math.floor(Math.random() * fromEntries.length);
      const [fromStr, toMap] = fromEntries[randomFromIdx];
      const toEntries = [...toMap.keys()];
      const randomToIdx = Math.floor(Math.random() * toEntries.length);
      const toStr = toEntries[randomToIdx];
      bestMove = { from: fromStr, to: toStr };
    }

    return bestMove;
  }

  // Minimax algorithm with alpha-beta pruning
  function minimax(simPositions, depth, alpha, beta, isMaximizing) {
    // Base case: reached maximum depth
    if (depth === 0) {
      return evaluatePosition(simPositions);
    }

    // Generate moves for current player
    const currentPlayer = isMaximizing ? "false" : "true";
    const currentMoves = genMoves(simPositions, currentPlayer);

    // No moves available - stalemate or checkmate
    if (currentMoves.size === 0) {
      return isMaximizing ? -900 : 900; // Heavy penalty for checkmate
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const [fromStr, toMap] of currentMoves) {
        for (const toStr of toMap.keys()) {
          const newPositions = simulateMove(
            simPositions,
            fromStr,
            toStr,
            currentPlayer
          );
          const evalScore = minimax(
            newPositions,
            depth - 1,
            alpha,
            beta,
            false
          );
          maxEval = Math.max(maxEval, evalScore);
          alpha = Math.max(alpha, evalScore);
          if (beta <= alpha) {
            break; // Beta cutoff
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const [fromStr, toMap] of currentMoves) {
        for (const toStr of toMap.keys()) {
          const newPositions = simulateMove(
            simPositions,
            fromStr,
            toStr,
            currentPlayer
          );
          const evalScore = minimax(newPositions, depth - 1, alpha, beta, true);
          minEval = Math.min(minEval, evalScore);
          beta = Math.min(beta, evalScore);
          if (beta <= alpha) {
            break; // Alpha cutoff
          }
        }
      }
      return minEval;
    }
  }

  // Simulate a move and return new position
  function simulateMove(pos, fromStr, toStr, player) {
    // Deep clone the positions
    const newPos = {
      true: new Map([...pos.true]),
      false: new Map([...pos.false]),
    };

    // Get the piece being moved
    const piece = newPos[player].get(fromStr);

    // Remove the piece from its current position
    newPos[player].delete(fromStr);

    // If capturing opponent's piece, remove it
    const opponent = player === "true" ? "false" : "true";
    if (newPos[opponent].has(toStr)) {
      newPos[opponent].delete(toStr);
    }

    // Move the piece to its new position
    newPos[player].set(toStr, piece);

    // Handle pawn promotion (simplified - always promotes to queen)
    if (piece[0] === "pawn") {
      const [toRow] = toStr.split(",").map(Number);
      if (
        (player === "true" && toRow === 0) ||
        (player === "false" && toRow === 7)
      ) {
        newPos[player].set(toStr, ["queen", 9]);
      }
    }

    return newPos;
  }

  // Comprehensive position evaluation function
  function evaluatePosition(pos) {
    let score = 0;

    // 1. Material evaluation
    for (const [posStr, [pieceType, pieceValue]] of pos.false) {
      score += pieceValue;
    }

    for (const [posStr, [pieceType, pieceValue]] of pos.true) {
      score -= pieceValue;
    }

    // 2. Piece-square tables - position-dependent piece values
    for (const [posStr, [pieceType, _]] of pos.false) {
      const [row, col] = posStr.split(",").map(Number);
      score += getPieceSquareValue(pieceType, row, col, gamePhase, false);
    }

    for (const [posStr, [pieceType, _]] of pos.true) {
      const [row, col] = posStr.split(",").map(Number);
      score -= getPieceSquareValue(pieceType, row, col, gamePhase, true);
    }

    // 3. Mobility evaluation - count legal moves for each side
    const cpuMoves = genMoves(pos, "false");
    const playerMoves = genMoves(pos, "true");

    let cpuMobilityCount = 0;
    for (const [_, toMap] of cpuMoves) {
      cpuMobilityCount += toMap.size;
    }

    let playerMobilityCount = 0;
    for (const [_, toMap] of playerMoves) {
      playerMobilityCount += toMap.size;
    }

    score += (cpuMobilityCount - playerMobilityCount) * 0.1;

    // 4. King safety
    score += evaluateKingSafety(pos, cpuMoves, playerMoves);

    // 5. Pawn structure
    score += evaluatePawnStructure(pos);

    return score;
  }

  // Evaluate king safety
  function evaluateKingSafety(pos, cpuMoves, playerMoves) {
    let safetyScore = 0;

    // Find king positions
    let cpuKingPos = null;
    let playerKingPos = null;

    for (const [posStr, [pieceType, _]] of pos.false) {
      if (pieceType === "king") {
        cpuKingPos = posStr;
        break;
      }
    }

    for (const [posStr, [pieceType, _]] of pos.true) {
      if (pieceType === "king") {
        playerKingPos = posStr;
        break;
      }
    }

    if (cpuKingPos && playerKingPos) {
      // Count attacks near kings
      const cpuKingAttacksCount = countAttacksNearKing(playerMoves, cpuKingPos);
      const playerKingAttacksCount = countAttacksNearKing(
        cpuMoves,
        playerKingPos
      );

      safetyScore += playerKingAttacksCount * 0.3;
      safetyScore -= cpuKingAttacksCount * 0.3;

      // King shelter (pawns in front of king)
      safetyScore += evaluateKingShelter(pos, cpuKingPos, false);
      safetyScore -= evaluateKingShelter(pos, playerKingPos, true);

      // Exposed king in endgame is good for attacking
      if (gamePhase === "endgame") {
        const [cpuKingRow, cpuKingCol] = cpuKingPos.split(",").map(Number);
        const [playerKingRow, playerKingCol] = playerKingPos
          .split(",")
          .map(Number);

        // Kings should be active in endgame - reward central position
        const cpuKingCentrality =
          4 - Math.abs(cpuKingRow - 3.5) + (4 - Math.abs(cpuKingCol - 3.5));
        const playerKingCentrality =
          4 -
          Math.abs(playerKingRow - 3.5) +
          (4 - Math.abs(playerKingCol - 3.5));

        safetyScore += cpuKingCentrality * 0.2;
        safetyScore -= playerKingCentrality * 0.2;

        // Reward king proximity to opponent's king in endgame
        const kingDistance =
          Math.abs(cpuKingRow - playerKingRow) +
          Math.abs(cpuKingCol - playerKingCol);
        if (pos.true.size < 5 && pos.false.size < 5) {
          safetyScore += (14 - kingDistance) * 0.1;
        }
      }
    }

    return safetyScore;
  }

  // Count attacks near king
  function countAttacksNearKing(opponentMoves, kingPos) {
    const [kingRow, kingCol] = kingPos.split(",").map(Number);
    let attackCount = 0;

    // Check attacks on squares around king
    for (let r = Math.max(0, kingRow - 1); r <= Math.min(7, kingRow + 1); r++) {
      for (
        let c = Math.max(0, kingCol - 1);
        c <= Math.min(7, kingCol + 1);
        c++
      ) {
        const squarePos = `${r},${c}`;

        // Count how many opponent pieces attack this square
        for (const [_, toMap] of opponentMoves) {
          if (toMap.has(squarePos)) {
            attackCount++;
          }
        }
      }
    }

    return attackCount;
  }

  // Evaluate pawn shield in front of king
  function evaluateKingShelter(pos, kingPos, isPlayer) {
    const [kingRow, kingCol] = kingPos.split(",").map(Number);
    let shelterScore = 0;
    const side = isPlayer ? "true" : "false";

    // Check for pawns in front of king (specific to each side)
    const direction = isPlayer ? -1 : 1; // Direction pawns move

    // Check the three files around king
    for (let c = Math.max(0, kingCol - 1); c <= Math.min(7, kingCol + 1); c++) {
      let pawnFound = false;

      // Check two ranks in front of king
      for (let steps = 1; steps <= 2; steps++) {
        const r = kingRow + direction * steps;
        if (r >= 0 && r <= 7) {
          const pawnPos = `${r},${c}`;
          if (pos[side].has(pawnPos) && pos[side].get(pawnPos)[0] === "pawn") {
            pawnFound = true;
            shelterScore += 3 - steps; // Closer pawns are better
            break;
          }
        }
      }

      if (!pawnFound) {
        shelterScore -= 0.5; // Penalty for missing pawns in the shield
      }
    }

    // Additional bonus if king is on back rank near corner (classic castle position)
    const isBackRank =
      (isPlayer && kingRow === 7) || (!isPlayer && kingRow === 0);
    const isNearCorner = kingCol <= 1 || kingCol >= 6;

    if (isBackRank && isNearCorner && gamePhase !== "endgame") {
      shelterScore += 1;
    }

    return shelterScore;
  }

  // Evaluate pawn structure
  function evaluatePawnStructure(pos) {
    let structureScore = 0;

    // Count pawns in each file
    const cpuPawnCounts = Array(8).fill(0);
    const playerPawnCounts = Array(8).fill(0);

    // Track pawn positions
    const cpuPawns = [];
    const playerPawns = [];

    for (const [posStr, [pieceType, _]] of pos.false) {
      if (pieceType === "pawn") {
        const [row, col] = posStr.split(",").map(Number);
        cpuPawnCounts[col]++;
        cpuPawns.push([row, col]);
      }
    }

    for (const [posStr, [pieceType, _]] of pos.true) {
      if (pieceType === "pawn") {
        const [row, col] = posStr.split(",").map(Number);
        playerPawnCounts[col]++;
        playerPawns.push([row, col]);
      }
    }

    // 1. Doubled pawns (penalty)
    for (let col = 0; col < 8; col++) {
      if (cpuPawnCounts[col] > 1) structureScore -= 0.5 * cpuPawnCounts[col];
      if (playerPawnCounts[col] > 1)
        structureScore += 0.5 * playerPawnCounts[col];
    }

    // 2. Isolated pawns (penalty)
    for (let col = 0; col < 8; col++) {
      const leftSupport = col > 0 ? cpuPawnCounts[col - 1] > 0 : false;
      const rightSupport = col < 7 ? cpuPawnCounts[col + 1] > 0 : false;

      if (cpuPawnCounts[col] > 0 && !leftSupport && !rightSupport) {
        structureScore -= 0.5 * cpuPawnCounts[col];
      }

      const playerLeftSupport = col > 0 ? playerPawnCounts[col - 1] > 0 : false;
      const playerRightSupport =
        col < 7 ? playerPawnCounts[col + 1] > 0 : false;

      if (
        playerPawnCounts[col] > 0 &&
        !playerLeftSupport &&
        !playerRightSupport
      ) {
        structureScore += 0.5 * playerPawnCounts[col];
      }
    }

    // 3. Passed pawns (bonus)
    for (const [row, col] of cpuPawns) {
      let isPassed = true;

      // Check if any opponent pawns can block this pawn
      for (const [pRow, pCol] of playerPawns) {
        if (pCol === col && pRow < row) {
          isPassed = false;
          break;
        }
        if (Math.abs(pCol - col) === 1 && pRow < row) {
          isPassed = false;
          break;
        }
      }

      if (isPassed) {
        // Bonus increases as pawn advances
        structureScore += 0.5 + row * 0.2;
      }
    }

    for (const [row, col] of playerPawns) {
      let isPassed = true;

      for (const [pRow, pCol] of cpuPawns) {
        if (pCol === col && pRow > row) {
          isPassed = false;
          break;
        }
        if (Math.abs(pCol - col) === 1 && pRow > row) {
          isPassed = false;
          break;
        }
      }

      if (isPassed) {
        structureScore -= 0.5 + (7 - row) * 0.2;
      }
    }

    return structureScore;
  }

  // Piece-Square tables - positional values for each piece type
  function getPieceSquareValue(pieceType, row, col, phase, isPlayer) {
    // Flip board for player perspective
    const r = isPlayer ? 7 - row : row;
    const c = col;

    switch (pieceType) {
      case "pawn":
        return evaluatePawnPosition(r, c, phase);
      case "knight":
        return evaluateKnightPosition(r, c, phase);
      case "bishop":
        return evaluateBishopPosition(r, c, phase);
      case "rook":
        return evaluateRookPosition(r, c, phase);
      case "queen":
        return evaluateQueenPosition(r, c, phase);
      case "king":
        return evaluateKingPosition(r, c, phase);
      default:
        return 0;
    }
  }

  // Piece-square table evaluation functions
  function evaluatePawnPosition(row, col, phase) {
    // Pawn advancement is good
    let value = row * 0.1;

    // Central pawns are better
    if (col >= 2 && col <= 5) {
      value += 0.2;
    }

    // Promote central pawns in opening/middlegame
    if (phase !== "endgame" && row >= 3 && (col === 3 || col === 4)) {
      value += 0.3;
    }

    // Passed pawns in endgame
    if (phase === "endgame" && row >= 5) {
      value += (row - 4) * 0.5;
    }

    return value;
  }

  function evaluateKnightPosition(row, col, phase) {
    // Knights prefer central positions
    const centralityBonus = 4 - Math.abs(col - 3.5) + (4 - Math.abs(row - 3.5));
    let value = centralityBonus * 0.1;

    // Knights on the rim are dim
    if (row === 0 || row === 7 || col === 0 || col === 7) {
      value -= 0.5;
    }

    // Outposts - advanced knights supported by pawns
    if (row >= 4 && row <= 5) {
      value += 0.3;
    }

    return value;
  }

  function evaluateBishopPosition(row, col, phase) {
    // Bishops like diagonals and open positions
    let value = 0;

    // Bishops prefer center control
    if ((row + col) % 2 === 0) {
      // Light square bishop
      value += Math.abs(col - 3.5) < 2 && Math.abs(row - 3.5) < 2 ? 0.3 : 0;
    } else {
      // Dark square bishop
      value += Math.abs(col - 3.5) < 2 && Math.abs(row - 3.5) < 2 ? 0.3 : 0;
    }

    // Bishops on long diagonals
    if (row === col || row + col === 7) {
      value += 0.2;
    }

    // Bad bishop (blocked by own pawns)
    if (row <= 2) {
      value -= 0.2;
    }

    return value;
  }

  function evaluateRookPosition(row, col, phase) {
    let value = 0;

    // Rooks on open files
    value += 0.3;

    // Rooks on 7th rank (attacking pawns)
    if (row === 6) {
      value += 0.5;
    }

    // Connected rooks
    value += 0.2;

    return value;
  }

  function evaluateQueenPosition(row, col, phase) {
    let value = 0;

    // Queens shouldn't be developed too early
    if (phase === "opening" && row < 6) {
      value -= 0.3;
    }

    // Center control in middlegame
    if (phase === "middlegame") {
      const centralityBonus =
        4 - Math.abs(col - 3.5) + (4 - Math.abs(row - 3.5));
      value += centralityBonus * 0.05;
    }

    // Active in endgame
    if (phase === "endgame") {
      value += 0.1;
    }

    return value;
  }

  function evaluateKingPosition(row, col, phase) {
    let value = 0;

    if (phase === "opening" || phase === "middlegame") {
      // King safety - prefer corners in opening/middlegame
      const distFromCenter = Math.abs(col - 3.5) + Math.abs(row - 3.5);
      value += distFromCenter * 0.1;

      // Castled position bonus
      if (row === 0 && (col <= 2 || col >= 5)) {
        value += 0.5;
      }
    } else {
      // In endgame, king should be active
      const centralityBonus =
        4 - Math.abs(col - 3.5) + (4 - Math.abs(row - 3.5));
      value += centralityBonus * 0.1;
    }

    return value;
  }

  // Finally, return the best move
  return findBestMove();
};
